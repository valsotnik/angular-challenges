import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBackHandler } from '../models';

@Injectable()
export class CloseDialogBackHandler implements DialogBackHandler {
  private readonly dialog = inject(MatDialog);

  canHandle(): boolean {
    return !!this.dialog.getDialogById('simple-main-dialog');
  }

  handle(): boolean {
    this.dialog.getDialogById('simple-main-dialog')?.close();
    return false;
  }
}
