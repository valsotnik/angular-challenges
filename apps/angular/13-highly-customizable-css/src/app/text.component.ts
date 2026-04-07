/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  template: `
    <p>
      <ng-content />
    </p>
  `,
  styles: `
    p {
      color: var(--text-color, black);
      font-size: var(--font-size, 10px);
    }
  `,
})
export class TextComponent {}
