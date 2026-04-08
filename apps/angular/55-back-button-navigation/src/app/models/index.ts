import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface BackButtonAware {
  onBackButton(): boolean | Promise<boolean> | Observable<boolean>;
}

export interface DialogBackHandler {
  canHandle(): boolean;
  handle(): boolean | Promise<boolean> | Observable<boolean>;
}

export const DIALOG_BACK_HANDLERS = new InjectionToken<DialogBackHandler[]>(
  'DIALOG_BACK_HANDLERS',
  {
    factory: () => [],
  },
);
