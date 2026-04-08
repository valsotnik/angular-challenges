import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DIALOG_BACK_HANDLERS } from '../models';

@Injectable()
export class DialogBackNavigationService {
  private readonly handlers = inject(DIALOG_BACK_HANDLERS);

  handleBackNavigation(): boolean | Promise<boolean> | Observable<boolean> {
    const handler = this.handlers.find((item) => item.canHandle());
    return handler ? handler.handle() : true;
  }
}
