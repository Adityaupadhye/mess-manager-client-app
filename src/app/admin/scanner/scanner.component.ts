import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IndexDbServiceService } from '../../services/localdb/index-db-service.service';
import { FoodCategory, INDEXED_DB_LOG_ENTRY_STORE_NAME, INDEXED_DB_USERS_STORE_NAME, PersonType } from '../../constants';
import { LogEntry } from '../../data/log-entry';
import { LoginService } from '../../services/auth/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu/menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SyncService } from '../../services/sync/sync.service';

@Component({
  selector: 'app-scanner',
  // standalone: true,
  // imports: [
  //   ZXingScannerModule,p
  //   CommonModule,
  //   SharedMaterialComponentsModule,
  //   DbModuleModule
  // ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent implements OnInit, AfterViewInit {

  protected _scanningError = false;
  protected _hasScanningStarted = false;
  protected foodCategories = Object.values(FoodCategory);

  scannedResult: string = 'res';
  isScanningEnabled = false;
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  availableDevices: MediaDeviceInfo[] = [];
  // currentDevice: MediaDeviceInfo | undefined;
  selectedDevice: MediaDeviceInfo | undefined;

  isUserValid: boolean = false;
  protected userValidityError: string = ''
  currentFoodCategory: FoodCategory = FoodCategory.BREAKFAST;
  currentPersonType: PersonType = PersonType.STUDENT;

  studentData = {
    'name': '',
    'hostel': '',
    'roll_no': '',
    'role': ''
  }

  isMobileView: boolean = false;
  breakpoint: number = 768;

  // food menu and wastage
  form: FormGroup;
  @ViewChild('myModal') exampleModal: ElementRef;
  private currentSelectedMenuList = [];

  // {"studentName":"Mohammad Aasim","rollNo":"24M2118","hostel":"H17","roomNo":"2112"}

  constructor(
    private iDBService: IndexDbServiceService,
    public loginService: LoginService,
    private fb: FormBuilder,
    public menuService: MenuService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private syncService: SyncService,
  ) {

    // Initialize form with controls
    this.form = this.fb.group({
      id: -1,
      date: ['', Validators.required],  // Date picker field
      food_category: ['breakfast', Validators.required],  // Dropdown field
      food_wastage: [0.00, [Validators.required]],  // Text input field
      menu: ['', [Validators.required, Validators.maxLength(100)]]  // Textarea field
    });

  }

  ngOnInit(): void {
    console.log('category: ', this.foodCategories);
    this.getAvailableDevices();

    this.isMobileView = window.innerWidth < this.breakpoint;
  }

  ngAfterViewInit(): void {
    this.form.get('date')?.valueChanges.subscribe((value) => {
      // if(!this.menuService.isAddingWastage) {
      //   return;
      // }
      console.log('date changed to:', value);

      if(value.length == 0) {
        console.debug('no date trigger');
        return;
      }

      // call search by date api
      this.spinner.show();
      this.menuService.search_by_date(value).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          console.debug('datewise response: ', response?.data);
          this.currentSelectedMenuList = response?.data;

          const currentFoodCategory = this.form.get('food_category')?.value;
          console.debug('food cat: ', currentFoodCategory);
          const menuItem = this.currentSelectedMenuList.find((item: any) => item.food_category === currentFoodCategory);

          console.debug('menu item: ', menuItem);

          if(menuItem) {
            this.form.patchValue({'id': menuItem['id'], 'menu': menuItem['menu'], 'food_wastage': menuItem['food_wastage']});
            this.form.get('food_wastage')?.enable();
          }
        }, 
        error: (err: any) => {
          this.spinner.hide();
          console.error('error in date wise call: ', err);
          this.form.patchValue({
            id: -1,
            food_wastage: 0.00,
            menu: ''
          });
          this.currentSelectedMenuList = [];
          this.form.get('food_wastage')?.disable();
          this.form.setErrors({ invalid: true });
          
        }
      })
    });  

    this.form.get('food_category')?.valueChanges.subscribe((value: any) => {
      // if(!this.menuService.isAddingWastage) {
      //   return;
      // }

      console.debug('food cat: ', value);
      const menuItem = this.currentSelectedMenuList.find((item: any) => item.food_category === value);

      console.debug('menu item: ', menuItem);

      if(menuItem) {
        this.form.patchValue({'id': menuItem['id'], 'menu': menuItem['menu'], 'food_wastage': menuItem['food_wastage']});
        this.form.get('food_wastage')?.enable();
      }
    })
  }


  async getAvailableDevices() {
    const devices = await this.getVideoInputDevices();
    console.log('available devices: ', devices);
    this.availableDevices = devices;
    this.selectedDevice = this.availableDevices[0]; // Select the first camera by default
  }

  async getVideoInputDevices(): Promise<MediaDeviceInfo[]> {
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    return mediaDevices.filter(device => device.kind === 'videoinput');
  }

  onDeviceChange(device: MediaDeviceInfo) {
    this.selectedDevice = device;
    console.log('selected device: ', this.selectedDevice);
  }

  protected toggleScanning(): boolean {
    this.isScanningEnabled = !this.isScanningEnabled;
    return this.isScanningEnabled;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = true;
    this.availableDevices = devices;
    console.log('on cameras found: ', devices);
    this.selectedDevice = devices[0];
    
    // Select the first available camera
    // if (devices.length > 0) {
    //   this.currentDevice = devices[0];
    // }
  }

  onScanSuccess(result: string) {
    this._playSound();
    console.log('result: ', result);
    this.scannedResult = result
    this._hasScanningStarted = true;

    try {
      let parsedStudentData = JSON.parse(result);
      this.studentData = parsedStudentData;

      //  if parsed successfully, check for hostel validity
      this.checkUserValidity(parsedStudentData);


    } catch (error) {
      console.error('Error in parsing: ', error);
      this._scanningError = true;
      this.toastr.error('Error in scanning. Please try again.');
    }
  }

  onCameraError(error: any): void {
    console.error('Error accessing camera: ', error);
    alert('Unable to access camera. Please check permissions.');
  }

  protected resetScanner() {
    this.studentData = {
      'name': '',
      'hostel': '',
      'roll_no': '',
      'role': ''
    };
    this.scannedResult = '';
    this._scanningError = false;
    this.isUserValid = false;
    this._hasScanningStarted = false;
    this.userValidityError = '';
  }

  private _playSound() {
    const audio = new Audio();
    audio.src = './assets/beep_once.mp3'; // Path to your audio file
    audio.load();                   // Preload the audio file
    audio.play();                   // Play the sound
  }

  private _playSoundError() {
    const audio = new Audio();
    audio.src = './assets/error-tone1.mp3'; // Path to your audio file
    audio.load();                   // Preload the audio file
    audio.play();                   // Play the sound
  }

  checkUserValidity(parsedUserData: any) {
    const userRollNo = parsedUserData['roll_no'];
    this.iDBService.getRecordByKey(INDEXED_DB_USERS_STORE_NAME, userRollNo)
      .subscribe({
        next: (result: any) => {
          console.log(`user record with roll_no: ${userRollNo}: `, result);

          // if result is undefined means student belongs to other hostel or is not authorized
          if(result == undefined) {
            console.debug('student from other hostel');
            this.isUserValid = false;
            this.userValidityError = 'User not registered';
            return;
          }

          if (result != null) {
            this.isUserValid = true;
            // check for duplicate entry in log entries
            this.iDBService.getRecordByIndex(INDEXED_DB_LOG_ENTRY_STORE_NAME, 'roll_no', userRollNo)
            .subscribe({
              next: (values: any[]) => {
                const parsedDay = new Date().toLocaleDateString();
                console.log('parsed day: ', parsedDay);

                // loop through entries
                for(let logEntry of values) {
                  const entryDate = new Date(logEntry['timestamp']*1000).toLocaleDateString();
                  console.log('entry date: ', entryDate);
                  
                  if(entryDate == parsedDay && logEntry['food_category'] == this.currentFoodCategory) {
                    console.log('duplicate scannig detected');
                    this.isUserValid = false;
                    this.userValidityError = 'Already scanned for this meal today.';
                    // show error toast
                    this.toastr.error('Already scanned for this meal today.', `Error: ${userRollNo}`);
                    this._playSoundError();
                    return;
                  }
                }

                // check for rebates
                let isRebateActive = this.syncService.activeRebates.includes(userRollNo);
                console.debug('is rebate active: ', isRebateActive);
                if(isRebateActive) {
                  this.isUserValid = false;
                  this.userValidityError = 'Your rebate is currently active.'

                  // show error toast
                  this.toastr.error('Your rebate is currently active.', `Error: ${userRollNo}`);
                  this._playSoundError();
                  return;
                }

                // add log entry locally
                console.debug('adding log entry...');
                this.userValidityError = '';
                this.addLogEntry(parsedUserData, this.currentPersonType);

                // show success toast
                this.toastr.success('Take your meal!', `Success: ${userRollNo}`);
              }, 
              error: (err: any) => {
                console.error('error in finding record by index: ', err);
              }
            });

          }
          else {
            this.isUserValid = false;
            this.toastr.error('User not registered');
            this._playSoundError();
          }

        },
        error: (error) => {
          console.error('error in idb: ', error);
          this.isUserValid = false;
        }
      })
  }


  addLogEntry(parsedUserData: any, personType: PersonType) {

    let currentLogEntry: LogEntry = {
      roll_no: parsedUserData['roll_no'],
      food_category: this.currentFoodCategory,
      // timestamp: Date.now(),
      timestamp: Math.floor(Date.now() / 1000),
      type: parsedUserData['role']
    }

    // adding log entry locally
    this.iDBService.addRecord(INDEXED_DB_LOG_ENTRY_STORE_NAME, currentLogEntry);


  }

  onCategoryChange(newCategory: any): void {
    console.log('Selected Food Category:', newCategory, typeof(newCategory));
    // Additional logic here based on the selected value
    console.log(this.currentFoodCategory, typeof(this.currentFoodCategory));
  }

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < this.breakpoint;
  }


  // menu and wastage

  onModalOpen() {
    console.log('menu fetch on modal open: ', this.menuService.isAddingMenu, this.menuService.isAddingWastage);

    if(this.menuService.isAddingWastage){
      this.form.get('menu')?.disable();
      this.form.get('food_wastage')?.disable();
    } else {
      this.form.get('menu')?.enable();  // To enable
      this.form.get('food_wastage')?.enable();
    }

  }

  // Form submit logic
  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data: ', this.form.value);
      // Handle form submission (e.g., send data to server)
      this.spinner.show();
      let requestObservable;
      const databaseEntryId = this.form.get('id')?.value
      if(databaseEntryId == -1) {
        requestObservable = this.menuService.post(this.form.value);
      }
      else {
        requestObservable = this.menuService.patch(this.form.value, databaseEntryId);
      }
      
      requestObservable.subscribe({
        next: (response: any) => {

          this.spinner.hide();
          console.debug('post menu response: ', response);
          this.closeModal();
          this.toastr.success('Update Successful');

        },
        error: (err: any) => {
          this.spinner.hide();
          console.error('post menu error: ', err);
          this.toastr.error('Error!!');
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }

  closeModal() {
    document.getElementById("ModalClose")?.click();
    return;
    const modalElement = this.exampleModal.nativeElement;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.hide();
    // $(this.inputFormModal.nativeElement).modal('hide');  // Use jQuery to hide the modal
  }

  onModalHide() {
    console.log('reset form on modal hide');
    this.resetForm();
  }

  resetForm() {
    const defaultValues = {
      id: -1,
      date: '',  
      food_category: 'breakfast',
      food_wastage: 0.00,
      menu: ''
    };
    this.form.reset(defaultValues);
  }
}
