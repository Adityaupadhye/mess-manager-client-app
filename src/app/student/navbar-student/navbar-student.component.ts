import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-navbar-student',
  standalone: false,
  templateUrl: './navbar-student.component.html',
  styleUrl: './navbar-student.component.css'
})
export class NavbarStudentComponent {
  constructor(
    public router: Router,
    public loginService: LoginService,
  ) {}
  isOpen=false;
}
