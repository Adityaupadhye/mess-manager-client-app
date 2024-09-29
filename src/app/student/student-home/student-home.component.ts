import { Component } from '@angular/core';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode'; 

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [SharedMaterialComponentsModule, FormsModule, QRCodeModule],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {

  studentData = {
    studentName: "Mohammad Aasim",
    rollNo: "24M2118",
    hostel: "H17",
    roomNo: "2112"
  };

  studentJsonString: string;
  
  constructor(){
    this.studentJsonString = JSON.stringify(this.studentData);
  }
}
