import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/auth/login.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const loginService = inject(LoginService); //inject the Login Service
  
//   if (loginService.isLoggedIn()) {
//     return true;  // Allow access if user is logged in
//   } else {
//     const router = inject(Router);
//     router.navigate(['auth/login']);  // Redirect to login if not authenticated
//     return false;
//   }
// };
