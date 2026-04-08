import { CanDeactivateFn } from '@angular/router';
import { BackButtonAware } from '../models';

export const backButtonGuard: CanDeactivateFn<BackButtonAware> = (component) =>
  component.onBackButton();
