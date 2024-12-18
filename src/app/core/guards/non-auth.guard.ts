import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';

export const nonAuthGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.currentUser;
  console.log(user);

  if (user) {
    const { uid } = user;
    return router.createUrlTree(['tasks', uid]);
  } else {
    return true;
  }
};
