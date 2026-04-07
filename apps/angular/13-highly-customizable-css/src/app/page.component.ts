/* eslint-disable @angular-eslint/component-selector */
import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  imports: [TextStaticComponent, TextComponent, NgStyle],
  template: `
    <static-text />
    <static-text class="error" />
    <static-text class="warning" />
    <text [ngStyle]="{ '--text-color': 'blue', '--font-size': '15' }">
      This is a blue text
    </text>
  `,
})
export class PageComponent {}
