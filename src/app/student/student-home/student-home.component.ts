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
  studentJsonString: string = '';
  ngOnInit() {
    const savedUserDetails = localStorage.getItem('userDetails');
if (savedUserDetails) {
  const userDetails = JSON.parse(savedUserDetails);
  this.name = userDetails['name']; 
  this.roll_no = userDetails['roll_no'];
  this.hostel = userDetails['hostel'];
}

    // Fetch student data from your backend API or database
    this.studentData = {
      name: this.name, //"Mohammad Aasim"
      roll_no: this.roll_no,      //"24M2118"
      hostel: this.hostel,    //"H17"
      role: this.role         //"2112",                
    };
    this.studentJsonString = JSON.stringify(this.studentData);
  }

  

  
  
  constructor(){
    // this.studentJsonString = " Hekjkjgherjkgkskljkgfcggjyhtcghnijhgtrdgfhyj765ftrfyuiysaghjkihuygufdiSdhyjukozfhyujgbyyuK7JHGBUYUNIDTSUFFI"
  }
}
