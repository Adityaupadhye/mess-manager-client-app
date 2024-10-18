import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../constants';
import { Router } from '@angular/router';

export interface ApiResponse {
  name: string;
  roll_no: string;
  hostel: string;
  role: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }
  private isAuthenticated = false; 

  login(username: string, password: string) {
    const body = { username, password }; // Adjust the payload as per your API
    
    return this.http.post(API_BASE_URL+'login/', body, {
      observe: 'response'
    });
    // this.isAuthenticated = true;
  }


  logout() {
    // Clear local storage
    // this.isAuthenticated = false;
    localStorage.removeItem('userDetails');
    
    // Optionally, redirect to the login page or home page after logging out
    this.router.navigate(['auth/login']); 
  }

  // isLoggedIn(): boolean {
  //   return this.isAuthenticated;
  // }
}
