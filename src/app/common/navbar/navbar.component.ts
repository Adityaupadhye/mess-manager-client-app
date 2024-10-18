import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { SharedMaterialComponentsModule } from '../../shared-material-components/shared-material-components.module';
import { RouterModule } from '@angular/router';

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
  ) {

  }
}
