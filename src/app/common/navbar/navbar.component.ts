import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { SyncService } from '../../services/sync/sync.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  // imports: [SharedMaterialComponentsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(
    public loginService: LoginService,
    public menuService: MenuService,
    public router: Router,
    private syncService: SyncService,
    
  ) {

  }
  ngOnInit(): void {
   
  }

  addWastage() {

  }

  addMenu() {
    console.log('adding menu');
    this.menuService.isAddingMenu = true; 
    this.menuService.isAddingWastage = false;
  }

  isScanPage(): boolean {
    return this.router.url.includes('scan');
  }

  syncdata(){
    this.syncService.syncLogEntries();
  }


  // syncdata() {
  //   this.syncService.syncLogEntries().subscribe({
  //     next: () => {
  //       this.showToast('Sync completed successfully!', 'success');
  //     },
  //     error: () => {
  //       this.showToast('Sync failed. Please try again.', 'error');
  //     }
  //   });
  // }

  // showToast(message: string, type: 'success' | 'error') {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000,
  //     panelClass: type === 'success' ? 'snack-bar-success' : 'snack-bar-error'
  //   });
  // }
}
