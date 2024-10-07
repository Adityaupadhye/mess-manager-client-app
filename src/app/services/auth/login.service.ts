import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../constants';

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

  private apiUrl = 'https://api.example.com/login'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = { username, password }; // Adjust the payload as per your API

    return this.http.post(API_BASE_URL+'login/', body, {
      observe: 'response'
    });
  }
}
