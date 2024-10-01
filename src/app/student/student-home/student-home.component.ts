import { Component , OnInit} from '@angular/core';
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

  
  name: string = '';
  roll_no: string = '';
  hostel: string = '';
  role: number = -1;

  studentData: any = {}; // Initialize an empty object
  ngOnInit() {
    // Retrieve data from localStorage
    this.name = localStorage.getItem('name') || '';
    this.roll_no = localStorage.getItem('roll_no') || '';
    this.hostel = localStorage.getItem('hostel') || '';
    this.role = parseInt(localStorage.getItem('role') || '-1', 10);

    // Fetch student data from your backend API or database
    this.studentData = {
      studentName: this.name, //"Mohammad Aasim"
      rollNo: this.roll_no,      //"24M2118"
      hostel: this.hostel,    //"H17"
      role: this.role         //"2112",                
    };
  }

  

  studentJsonString: string;
  
  constructor(){
    this.studentJsonString = JSON.stringify(this.studentData);
    // this.studentJsonString = " Hekjkjgherjkgkskljkgfcggjyhtcghnijhgtrdgfhyj765ftrfyuiysaghjkihuygufdiSdhyjukozfhyujgbyyuK7JHGBUYUNIDTSUFFI"
  }
}
