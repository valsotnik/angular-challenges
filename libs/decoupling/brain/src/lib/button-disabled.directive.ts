/* eslint-disable @angular-eslint/directive-selector */
import { BUTTON_STATE, ButtonState } from '@angular-challenges/decoupling/core';
import { Directive, forwardRef, signal, WritableSignal } from '@angular/core';

@Directive({
  selector: 'button[btnDisabled]',
  host: {
    '(click)': 'toggleState()',
  },
  providers: [
    {
      provide: BUTTON_STATE,
      useExisting: forwardRef(() => BtnDisabledDirective),
    },
  ],
})
export class BtnDisabledDirective {
  state: WritableSignal<ButtonState> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
