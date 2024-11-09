import { Component, OnInit } from '@angular/core';
import { LS_USERS_LAST_SYNC_TIME_KEY } from './constants';
import { SyncService } from './services/sync/sync.service';
import { User } from './data/user';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet, SharedMaterialComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'mess-manager-client-app';

  constructor(
    private syncService: SyncService
  ) {}


  ngOnInit(): void {

    // let _loggedInUser = localStorage.getItem('userDetails');
    // if(_loggedInUser != null) {
    //   let loggedInUser = JSON.parse(_loggedInUser);

    //   if(loggedInUser.role == Role.ADMIN) {
    //     this._checkUsersSyncState(loggedInUser);
    //     setInterval(() => {
    //       this.syncService.syncLogEntries();
    //     }, 30000);
    //   }
    // }
    console.log('app init');
    this.syncService.fetchActiveRebates();
    
  }

  private _checkUsersSyncState(userDetails: User) {
    console.log('syncing users locally');

    let last_sync_time_users = localStorage.getItem(LS_USERS_LAST_SYNC_TIME_KEY);

    if(!last_sync_time_users) {
      // sync users

      this.syncService.fetchUsers(userDetails.role, userDetails.hostel);

    }
    else {

      if(!this._dateCheck(last_sync_time_users)) {
        this.syncService.fetchUsers(userDetails.role, userDetails.hostel);
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
