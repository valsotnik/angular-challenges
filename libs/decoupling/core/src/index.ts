import { InjectionToken, Signal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

export interface ButtonStatePort {
  state: Signal<ButtonState>;
}

export const BUTTON_STATE = new InjectionToken<ButtonStatePort>('BUTTON_STATE');
