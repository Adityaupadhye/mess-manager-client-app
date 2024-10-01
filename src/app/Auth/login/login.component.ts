import { Component} from '@angular/core';
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
export class LoginComponent{

  showPassword: boolean = false; // To track password visibility

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  username: string = '';
  password: string = '';
  name: string    = 'Aasim';
  roll_no: string = '123456';
  hostel: string  = 'h56646';
  role: number    = -1;
  Message: string = 'Login Failed: Either wrong password or username';

  constructor(private loginService: LoginService, private router: Router){}

  
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
          
          // Store the necessary data in localStorage
      localStorage.setItem('name', response.name || '');
      localStorage.setItem('roll_no', response.roll_no || '');
      localStorage.setItem('hostel', response.hostel || '');
      localStorage.setItem('role', response.role?.toString() || '-1'); 
      // Assigning values to the new properties
        // this.name = response.name || '';
        // this.roll_no = response.roll_no || '';
        // this.hostel = response.hostel || '';
        // this.role = response.role || -1;role?.toString() || '-1');

          console.log('Login Successful:');
        } else {
          console.log('Login Failed:', this.Message); // Handle failure message
        }
      },
      error: (err) => {
        // Handle error
        //console.error('Login Error:', err);
        
      localStorage.setItem('name', this.name || '');
      localStorage.setItem('roll_no', this.roll_no || '');
      localStorage.setItem('hostel', this.hostel || '');
      localStorage.setItem('role', this.role?.toString() || '-1');

      if(this.role == -1)
      {
        this.router.navigate(['student/home']);
      }
      else if(this.role == 2)
      {
        //show Manager view
        //route to manager
      }
      else{
        //superAdmin if exits as role : 1, 2, 3
      }
      }
    });
  }
}
