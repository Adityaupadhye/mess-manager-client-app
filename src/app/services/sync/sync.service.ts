import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndexDbServiceService } from '../localdb/index-db-service.service';
import { API_BASE_URL, INDEXED_DB_USERS_STORE_NAME, LS_USERS_LAST_SYNC_TIME_KEY } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(
    private http: HttpClient,
    private idbService: IndexDbServiceService
  ) { }


  fetchUsers() {
    this.http.get(API_BASE_URL + '/data/users')
      .subscribe({
        next: (response: any) => {

          // response is the list of users

          // add all those to indexed db
          // this.idbService.addRecord(INDEXED_DB_USERS_STORE_NAME, response);

          // update local storage
          localStorage.setItem(LS_USERS_LAST_SYNC_TIME_KEY, Date.now().toString());

        },
        error: (err: any) => {
          console.error('eror in users db fetch: ', err);
          // temp
          this.idbService.addRecord(INDEXED_DB_USERS_STORE_NAME, { 'name': 'Aditya', 'role': 1, 'hostel': 'H17', 'roll_no': '24MXXXX' });
        }
      })
  }

  


}
