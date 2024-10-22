import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';
import { Router, RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  // imports: [SharedMaterialComponentsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public loginService: LoginService,
    public menuService: MenuService,
    public router: Router
  ) {

  }

  addWastage() {

  }

  addMenu() {
    console.log('adding menu');
    this.menuService.isAddingMenu = true; 
    this.menuService.isAddingWastage = false;
  }
}
