import { Injectable, signal } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private currentUser = signal<User | undefined>(undefined);
  readonly user = this.currentUser.asReadonly();

  add(user: User): void {
    this.currentUser.set(user);
  }
}
