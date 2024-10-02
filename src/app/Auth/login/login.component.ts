import { Component } from '@angular/core';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';
import { LoginService } from '../../services/auth/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedMaterialComponentsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private loginService: LoginService, private router: Router) {
    // Check if userDetails already exists in localStorage
    const storedUserDetails = localStorage.getItem('userDetails');

    if (storedUserDetails) {
      console.log('Already logged in');
      // Optionally, navigate to another page if already logged in
      const userDetails = JSON.parse(storedUserDetails);
      // this.router.navigate(['some/protected/page']);
      if (userDetails.role == -1) {
        this.router.navigate(['student/home']);
      }
      else if (userDetails.role == 2) {
        //show Manager view
        //route to manager
      }
      else {
        //superAdmin if exits as role : 1, 2, 3
      }
    } else {
      console.log('Not logged in');
    }
  }


  showPassword: boolean = false; // To track password visibility

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  username: string = '';
  password: string = '';
  name: string = 'Aasim';
  roll_no: string = '24MXXXX';
  hostel: string = 'hXX';
  role: number = -1;
  Message: string = 'Login Failed: Either wrong password or username';



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
    if (!emailRegex.test(trimmedUsername)) {
      alert('Please enter a valid email address.');
      return;
    }

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
    if (!passwordStrengthRegex.test(trimmedPassword)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    this.loginService.login(trimmedUsername, trimmedPassword).subscribe({
      next: (response) => {
        // Assuming response.Result indicates success
        if (response) {

          const userDetails = {
            name: response.name || '',
            roll_no: response.roll_no || '',
            hostel: response.hostel || '',
            role: response.role?.toString() || '-1'
          };

          // Save the object as a JSON string in localStorage
          localStorage.setItem('userDetails', JSON.stringify(userDetails));

          console.log('Login Successful:');
        } else {
          console.log('Login Failed:', this.Message); // Handle failure message
        }
      },
      error: (err) => {
        // Handle error
        //console.error('Login Error:', err);
        const userDetails = {
          name: this.name || '',
          roll_no: this.roll_no || '',
          hostel: this.hostel || '',
          role: this.role?.toString() || '-1'
        };

        // Save the object as a JSON string in localStorage
        localStorage.setItem('userDetails', JSON.stringify(userDetails));


        if (this.role == -1) {
          this.router.navigate(['student/home']);
        }
        else if (this.role == 2) {
          //show Manager view
          //route to manager
        }
        else {
          //superAdmin if exits as role : 1, 2, 3
        }
      }
    });
  }
}
