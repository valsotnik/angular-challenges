import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { BackButtonAware, DIALOG_BACK_HANDLERS } from '../models';
import { DialogBackNavigationService } from '../services/dialog-back-navigation.service';
import { CloseDialogBackHandler } from './close-dialog-back-handler.service';

@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
  providers: [
    CloseDialogBackHandler,
    DialogBackNavigationService,
    {
      provide: DIALOG_BACK_HANDLERS,
      useFactory: (handler: CloseDialogBackHandler) => [handler],
      deps: [CloseDialogBackHandler],
    },
  ],
})
export class SimpleActionComponent implements BackButtonAware {
  private readonly backNavigation = inject(DialogBackNavigationService);
  readonly #dialog = inject(MatDialog);

  onBackButton(): boolean | Promise<boolean> | Observable<boolean> {
    return this.backNavigation.handleBackNavigation();
  }

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      id: 'simple-main-dialog',
      width: '250px',
      closeOnNavigation: false,
    });
  }
}
