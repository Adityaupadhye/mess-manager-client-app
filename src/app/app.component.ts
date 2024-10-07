import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedMaterialComponentsModule } from './shared-material-components/shared-material-components.module';
import { LS_USERS_LAST_SYNC_TIME_KEY } from './constants';
import { SyncService } from './services/sync/sync.service';

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

    this._checkUsersSyncState();
    
  }

  private _checkUsersSyncState() {
    console.log('syncing users locally');

    let last_sync_time_users = localStorage.getItem(LS_USERS_LAST_SYNC_TIME_KEY);

    if(!last_sync_time_users) {
      // sync users

      this.syncService.fetchUsers();

    }
    else {

      if(!this._dateCheck(last_sync_time_users)) {
        this.syncService.fetchUsers();
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
