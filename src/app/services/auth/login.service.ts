import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, INDEXED_DB_USERS_STORE_NAME } from '../../constants';
import { Router } from '@angular/router';
import { IndexDbServiceService } from '../localdb/index-db-service.service';

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

  constructor(
    private http: HttpClient, 
    private router: Router,
    private idbService: IndexDbServiceService
  ) { }
  private isAuthenticated = false; 

  getCurrentUser() {
    let userDetailsItem = localStorage.getItem('userDetails');
    return userDetailsItem != null ? JSON.parse(userDetailsItem) : null;
  }

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

    // clear indexed db
    this.idbService.clearStore(INDEXED_DB_USERS_STORE_NAME)
    .subscribe({
      next: (result: any) => {
        console.log('clear all result: ', result);
      },
      error: (err: any) => {
        console.error('clear all error: ', err);
      }
    });

    // delete last sync time from localstorage
    localStorage.removeItem('last_sync_time_users');
    
    
    // Optionally, redirect to the login page or home page after logging out
    this.router.navigate(['auth/login']); 
  }

  // isLoggedIn(): boolean {
  //   return this.isAuthenticated;
  // }
}
