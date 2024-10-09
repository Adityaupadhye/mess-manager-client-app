import { Component, signal } from '@angular/core';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';
import { ApiResponse, LoginService } from '../../services/auth/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Role } from '../../constants';
import { SyncService } from '../../services/sync/sync.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedMaterialComponentsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(
    private loginService: LoginService, 
    private router: Router,
    private syncService: SyncService,
    private spinner: NgxSpinnerService
  ) {
    // Check if userDetails already exists in localStorage
    const storedUserDetails = localStorage.getItem('userDetails');

    if (storedUserDetails) {
      console.log('Already logged in');
      const userDetails = JSON.parse(storedUserDetails);

      if (userDetails.role == Role.STUDENT) {
        this.router.navigate(['student/home']);
      }
      else if (userDetails.role == Role.ADMIN) {
        //route to manager
        syncService.checkUsersSyncState(userDetails);
        this.router.navigate(['admin/scan']);

      }
    } else {
      console.log('Not logged in');
    }
  }


  showPassword: boolean = true; // To track password visibility
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  username: string = '';
  password: string = '';
  // name: string = 'Aasim';
  // roll_no: string = '24MXXXX';
  // hostel: string = 'hXX';
  // role: number = -1;
  // Message: string = 'Login Failed: Either wrong password or username';



  checkButton(): void {
    // Trim the inputs to remove any leading or trailing whitespace
    const trimmedUsername = this.username.trim();
    const trimmedPassword = this.password.trim();

    // Validate that both fields are not empty
    if (!trimmedUsername || !trimmedPassword) {
      alert('Please enter both username and password.');
      return; // Exit the function if validation fails
    }
    // Validate email format (if applicable)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(trimmedUsername)) {
    //   alert('Please enter a valid email address.');
    //   return;
    // }

    // Validate minimum length
    if (trimmedUsername.length < 3) {
      alert('Username must be at least 3 characters long.');
      return;
    }

    if (trimmedPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // Validate password strength
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    // if (!passwordStrengthRegex.test(trimmedPassword)) {
    //   alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    //   return;
    // }
    this.spinner.show();
    this.loginService.login(trimmedUsername, trimmedPassword).subscribe({
      next: (response: HttpResponse<ApiResponse> | any) => {
        this.spinner.hide();
        // Assuming response.Result indicates success
        if (response.status == 200) {

          console.log('response: ', response);
          const responseBody = response.body;

          const userDetails = {
            name: responseBody.name || '',
            roll_no: responseBody.roll_no || '',
            hostel: responseBody.hostel || '',
            role: responseBody.role || ''
          };

          // Save the object as a JSON string in localStorage
          localStorage.setItem('userDetails', JSON.stringify(userDetails));

          console.log('Login Successful:');

          if (userDetails.role == Role.STUDENT) {
            this.router.navigate(['student/home']);
          }
          else if (userDetails.role == Role.ADMIN) {
            //show Manager view
            //route to manager
            this.syncService.checkUsersSyncState(userDetails);
            this.router.navigate(['admin/scan']);
          }
        }
        // else {
        //   console.log('Login Failed:', this.Message); // Handle failure message
        // }
      },
      error: (err) => {
        // Handle error
        this.spinner.hide();
        console.error('Login Error:', err);
        alert(err.error.error);

      }
    });
  }
  
  onSubmit(){
    
  }
}

