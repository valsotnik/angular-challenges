/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

@Component({
  selector: 'static-text',
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: `
    :host-context(.warning) {
      --text-color: orange;
      --font-size: 25px;
    }
    :host-context(.error) {
      --text-color: red;
      --font-size: 30px;
    }
  `,
})
export class TextStaticComponent {}
