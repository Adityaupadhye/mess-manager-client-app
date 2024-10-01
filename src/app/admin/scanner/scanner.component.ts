import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [
    ZXingScannerModule,
    CommonModule,
    SharedMaterialComponentsModule
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent implements OnInit {

  protected _scanningError = false;

  scannedResult: string = 'res';
  isScanningEnabled = false;
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;

  studentData = {
    'studentName': '',
    'hostel': '',
    'rollNo': '',
    'rooomNo': ''
  }

  // {"studentName":"Mohammad Aasim","rollNo":"24M2118","hostel":"H17","roomNo":"2112"}

  constructor() {

  }

  ngOnInit(): void {
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
      'studentName': '',
      'hostel': '',
      'rollNo': '',
      'rooomNo': ''
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
}
