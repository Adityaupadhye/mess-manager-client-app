import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndexDbServiceService } from '../localdb/index-db-service.service';
import { API_BASE_URL, INDEXED_DB_LOG_ENTRY_STORE_NAME, INDEXED_DB_USERS_STORE_NAME, LS_USERS_LAST_SYNC_TIME_KEY, Role } from '../../constants';
import { User } from '../../data/user';
import { LogEntry } from '../../data/log-entry';
import { Key } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(
    private http: HttpClient,
    private idbService: IndexDbServiceService
  ) { }


  fetchUsers(role: string, hostel: string) {
    this.http.get(`${API_BASE_URL}?role=${Role.STUDENT}&hostel=${hostel}`)
      .subscribe({
        next: (response: any) => {

          // response is the list of users
          let userList: User[] = response;
          console.log('users: ', userList);
          
          // add all those to indexed db
          for(let userItem of userList) {
            this.idbService.addRecord(INDEXED_DB_USERS_STORE_NAME, userItem);
          }

          // update local storage
          localStorage.setItem(LS_USERS_LAST_SYNC_TIME_KEY, Date.now().toString());

        },
        error: (err: any) => {
          console.error('eror in users db fetch and insert: ', err);
          // temp
          // this.idbService.addRecord(INDEXED_DB_USERS_STORE_NAME, { 'name': 'Aditya', 'role': 1, 'hostel': 'H17', 'roll_no': '24MXXXX' });
        }
      })
  }

  syncLogEntries() {
    console.log('syncing log entries');

    this.idbService.getRecords(INDEXED_DB_LOG_ENTRY_STORE_NAME)
    .subscribe({
      next: (value: any) => {
        let logEntryCount = value.length;
        console.log(`found ${logEntryCount} entries in indexed db`);

        if(logEntryCount == 0) {
          console.log('no log entry found skipping server sync');
          return;
        }

        const uniqueFoodLogs = this._filterOutDuplicateEntries(value);
        console.log(`unique entries: ${uniqueFoodLogs.length}`);
        

        this._serverSyncLogEntries(uniqueFoodLogs, value);
      },
      error: (err: any) => {
        console.error('error reading indexeddb log entry: ', err);
      }
    });

  }

  private _filterOutDuplicateEntries(entries: LogEntry[]) {
    const map = new Map<string, LogEntry>();

    for(const logEntry of entries) {
      const dateString = new Date(logEntry.timestamp).toDateString();
      const key = `${logEntry.roll_no}_${logEntry.food_category}_${dateString}`;

      if(!map.has(key)) {
        map.set(key, logEntry);
      }
    }


    return Array.from(map.values()); 
  }

  private _serverSyncLogEntries(entries: LogEntry[], entriesWithDuplicates: LogEntry[]) {

    let data = {
      'foodlogs': entries
    };
    console.log('post log entry API call start');
    

    this.http.post(API_BASE_URL+'post/', data)
    .subscribe({
      next: (response: any) => {
        console.log('posted data response: ', response);
        
        // delete log entries
        this._deleteSyncedLogEntries(entriesWithDuplicates);
      },
      error: (err: any) => {
        console.error('error in posting API: ', err);
      }
    })
  }

  private _deleteSyncedLogEntries(syncedEntries: LogEntry[]) {

    console.log(`deleing ${syncedEntries.length} log entries from indexed db`);

    // create array of IDBKeys (timestamp)
    let timestamp_keys: Key[] = [];
    for(const syncedEntry of syncedEntries) {
      timestamp_keys.push(syncedEntry.timestamp);
    }


    this.idbService.deleteRecords(INDEXED_DB_LOG_ENTRY_STORE_NAME, timestamp_keys)
    .subscribe({
      next: (value: number[]) => {
        console.log('after delete: ', value);
      },
      error: (err: any) => {
        console.error('log entry bulk delete error: ', err);
      }
    })
  }


  checkUsersSyncState(userDetails: User) {
    console.log('syncing users locally');

    let last_sync_time_users = localStorage.getItem(LS_USERS_LAST_SYNC_TIME_KEY);

    if(!last_sync_time_users) {
      // sync users
      this.fetchUsers(userDetails.role, userDetails.hostel);

    }
    else {

      if(!this._dateCheck(last_sync_time_users)) {
        this.fetchUsers(userDetails.role, userDetails.hostel);
      }
      console.log('users already synced');

    }
  }


  private _dateCheck(storedTimesamp: string) {

    const storedDate = new Date(Number(storedTimesamp)); // Make sure to convert the string to a number

    // Step 3: Get today's date
    const today = new Date();
    // Set the time of today's date to midnight for comparison
    today.setHours(0, 0, 0, 0);

    // Step 4: Compare the dates
    if (storedDate.setHours(0, 0, 0, 0) === today.getTime()) {
      console.log('The stored date is today.');
      return true;
    } else {
      console.log('The stored date is not today.');
      return false;
    }
  }

  


}
