import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminauthGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const storedUserDetails: string | null = localStorage.getItem('userDetails');
  let role: string | undefined;  
  
  if (storedUserDetails) {
    const userDetails = JSON.parse(storedUserDetails);
    role = userDetails?.role;  // Assign role
  }

  if (storedUserDetails !=null && role === "admin") {
    return true;
  } else {
    router.navigate(['auth/login']);
    return false;  // Reject the request
  }
};
