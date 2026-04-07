import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserStore } from '../user.store';

export const adminMatchGuard: CanMatchFn = () => {
  const store = inject(UserStore);

  return store.user()?.isAdmin ?? false;
};

export const nonAdminMatchGuard: CanMatchFn = () => {
  const store = inject(UserStore);
  const router = inject(Router);
  const user = store.user();

  if (!user) {
    return router.createUrlTree(['/']);
  }

  return !user.isAdmin;
};
