import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const nonAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);

  return user(auth).pipe(
    map((currentUser) => {
      if (currentUser) {
        return router.createUrlTree(['tasks', currentUser.uid]);
      } else {
        return true;
      }
    }),
  );
};
