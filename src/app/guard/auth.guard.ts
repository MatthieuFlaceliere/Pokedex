import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  return authService.isAuth().pipe(
    tap(value => {
      if (!value) {
        router.navigate(['/sign-in']);
      }
    }),
  );
};
