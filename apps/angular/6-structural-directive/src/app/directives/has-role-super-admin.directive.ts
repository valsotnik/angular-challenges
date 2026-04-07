import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserStore } from '../user.store';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[hasRoleSuperAdmin]' })
export class HasRoleSuperAdminDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly vcRef = inject(ViewContainerRef);
  private readonly store = inject(UserStore);

  readonly hasRoleSuperAdmin = input(false);

  private hasView = false;

  constructor() {
    effect(() => {
      const enabled = this.hasRoleSuperAdmin();
      const isAdmin = this.store.user()?.isAdmin ?? false;

      this.updateView(enabled && isAdmin);
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
}
