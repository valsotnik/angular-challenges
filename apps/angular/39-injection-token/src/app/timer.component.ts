import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER_TOKEN } from './data';

@Component({
  selector: 'timer',
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  private readonly delay = inject(TIMER_TOKEN);
  timer = toSignal(interval(this.delay));
}
