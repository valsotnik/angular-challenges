import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogBackHandler } from '../models';

@Injectable()
export class SensitiveDialogBackHandler implements DialogBackHandler {
  private readonly dialog = inject(MatDialog);

  canHandle(): boolean {
    return this.hasSensitiveMainDialog() || this.hasConfirmationDialog();
  }

  handle(): boolean {
    if (this.hasConfirmationDialog()) {
      this.dialog.getDialogById('sensitive-confirm-dialog')?.close();
      return false;
    }

    if (this.hasSensitiveMainDialog()) {
      this.dialog.open(ConfirmDialogComponent, {
        id: 'sensitive-confirm-dialog',
        width: '320px',
      });
      return false;
    }

    return true;
  }

  private hasSensitiveMainDialog(): boolean {
    return !!this.dialog.getDialogById('sensitive-main-dialog');
  }

  private hasConfirmationDialog(): boolean {
    return !!this.dialog.getDialogById('sensitive-confirm-dialog');
  }
}
