import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[hasRole]' })
export class HasRoleDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly vcRef = inject(ViewContainerRef);
  private readonly store = inject(UserStore);

  readonly hasRole = input.required<Role | Role[]>();

  private hasView = false;

  constructor() {
    effect(() => {
      const normalizedRoles = this.normalizeRoles(this.hasRole());
      const user = this.store.user();

      const canSee =
        !!user &&
        (user.isAdmin ||
          normalizedRoles.some((role) => user.roles.includes(role)));

      this.updateView(canSee);
    });
  }

  private updateView(canSee: boolean): void {
    if (canSee && !this.hasView) {
      this.vcRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
      return;
    }

    if (!canSee && this.hasView) {
      this.vcRef.clear();
      this.hasView = false;
    }
  }

  private normalizeRoles(value: Role | Role[]): Role[] {
    return Array.isArray(value) ? value : [value];
  }
}
