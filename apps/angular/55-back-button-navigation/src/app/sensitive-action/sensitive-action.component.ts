import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { BackButtonAware, DIALOG_BACK_HANDLERS } from '../models';
import { DialogBackNavigationService } from '../services/dialog-back-navigation.service';
import { SensitiveDialogBackHandler } from './sensitive-dialog-back-handler.service';

@Component({
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
  providers: [
    SensitiveDialogBackHandler,
    DialogBackNavigationService,
    {
      provide: DIALOG_BACK_HANDLERS,
      useFactory: (handler: SensitiveDialogBackHandler) => [handler],
      deps: [SensitiveDialogBackHandler],
    },
  ],
})
export class SensitiveActionComponent implements BackButtonAware {
  private readonly backNavigation = inject(DialogBackNavigationService);

  onBackButton(): boolean | Promise<boolean> | Observable<boolean> {
    return this.backNavigation.handleBackNavigation();
  }
  readonly #dialog = inject(MatDialog);

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      id: 'sensitive-main-dialog',
      width: '250px',
      closeOnNavigation: false,
    });
  }
}
