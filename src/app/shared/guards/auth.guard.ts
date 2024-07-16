import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicebusinesscase/authentification/authservice.service';



export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return true;
  } else {
    router.navigate(['connexion']);
    return false;
  }
};