import { Component, OnInit } from '@angular/core';
import { IndexDbServiceService } from '../../services/localdb/index-db-service.service';
import { FoodCategory, INDEXED_DB_LOG_ENTRY_STORE_NAME, INDEXED_DB_USERS_STORE_NAME, PersonType } from '../../constants';
import { LogEntry } from '../../data/log-entry';
import { NgxIndexedDBService } from 'ngx-indexed-db';

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
export class ScannerComponent implements OnInit {

  protected _scanningError = false;
  protected foodCategories = Object.keys(FoodCategory).filter(key => isNaN(Number(key))); ;

  scannedResult: string = 'res';
  isScanningEnabled = false;
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;
  selectedDevice: MediaDeviceInfo | undefined;

  isUserValid: boolean = false;
  currentFoodCategory: FoodCategory = FoodCategory.NA;
  currentPersonType: PersonType = PersonType.STUDENT;

  studentData = {
    'name': '',
    'hostel': '',
    'roll_no': '',
    'role': -1
  }

  // {"studentName":"Mohammad Aasim","rollNo":"24M2118","hostel":"H17","roomNo":"2112"}

  constructor(
    private iDBService: IndexDbServiceService
  ) {

  }

  ngOnInit(): void {
    console.log('category: ', this.foodCategories);
  }


  async getAvailableDevices() {
    const devices = await this.getVideoInputDevices();
    this.availableDevices = devices;
    this.selectedDevice = this.availableDevices[0]; // Select the first camera by default
  }

  async getVideoInputDevices(): Promise<MediaDeviceInfo[]> {
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    return mediaDevices.filter(device => device.kind === 'videoinput');
  }

  onDeviceChange(device: MediaDeviceInfo) {
    this.selectedDevice = device;
  }

  protected toggleScanning(): boolean {
    this.isScanningEnabled = !this.isScanningEnabled;
    return this.isScanningEnabled;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = true;
    this.availableDevices = devices;
    // Select the first available camera
    if (devices.length > 0) {
      this.currentDevice = devices[0];
    }
  }

  onScanSuccess(result: string) {
    this._playSound();
    console.log('result: ', result);
    this.scannedResult = result

    try {
      let parsedStudentData = JSON.parse(result);
      this.studentData = parsedStudentData;

      //  if parsed successfully, check for hostel validity
      this.checkUserValidity(parsedStudentData);


    } catch (error) {
      console.error('Error in parsing: ', error);
      this._scanningError = true;
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
      'role': -1
    };
    this.scannedResult = '';
    this._scanningError = false;
  }

  private _playSound() {
    const audio = new Audio();
    audio.src = './assets/beep_once.mp3'; // Path to your audio file
    audio.load();                   // Preload the audio file
    audio.play();                   // Play the sound
  }

  checkUserValidity(parsedUserData: any) {
    this.iDBService.getRecordByKey(INDEXED_DB_USERS_STORE_NAME, parsedUserData['roll_no'])
      .subscribe({
        next: (result) => {
          console.log('record: ', result);

          if (result != null) {
            this.isUserValid = true;
            // add log entry locally
            this.addLogEntry(parsedUserData, this.currentPersonType);

          }
          else {
            this.isUserValid = false;
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
      timestamp: Date.now(),
      person_type: personType
    }

    // adding log entry locally
    this.iDBService.addRecord(INDEXED_DB_LOG_ENTRY_STORE_NAME, currentLogEntry);


  }

  onCategoryChange(newCategory: any): void {
    console.log('Selected Food Category:', newCategory, typeof(newCategory));
    // Additional logic here based on the selected value
    console.log(this.currentFoodCategory, typeof(this.currentFoodCategory));
  }
}
