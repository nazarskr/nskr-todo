import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const nonAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = getAuth();

  const authState$ = new Observable<User | null>((observer) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      observer.next(user);
      observer.complete();
    });
    return { unsubscribe };
  });

  return authState$.pipe(
    map((currentUser) => {
      if (currentUser) {
        return router.createUrlTree(['tasks', currentUser.uid]);
      } else {
        return true;
      }
    }),
  );
};
