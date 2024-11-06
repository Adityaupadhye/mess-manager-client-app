import { Component , OnInit} from '@angular/core';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode'; 
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { NavbarStudentComponent } from '../navbar-student/navbar-student.component';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-student-home',
  // standalone: true,
  // imports: [AppModule, SharedMaterialComponentsModule, FormsModule, QRCodeModule],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {


  //logout
  constructor(
    public loginService: LoginService
  ){
    
  }

  // logout() {
  //   // Clear local storage
  //   localStorage.removeItem('userDetails');
    
  //   // Optionally, redirect to the login page or home page after logging out
  //   this.router.navigate(['auth/login']); 
  // }


  // show student data
  
  name: string = '';
  roll_no: string = '';
  hostel: string = '';
  role: string = '';

  studentData: any = {}; // Initialize an empty object
  studentJsonString: string = '';
  ngOnInit() {
    const savedUserDetails = localStorage.getItem('userDetails');
if (savedUserDetails) {
  const userDetails = JSON.parse(savedUserDetails);
  this.name = userDetails['name']; 
  this.roll_no = userDetails['roll_no'];
  this.hostel = userDetails['hostel'];
  this.role = userDetails['role']
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

  

  
  
  
}
