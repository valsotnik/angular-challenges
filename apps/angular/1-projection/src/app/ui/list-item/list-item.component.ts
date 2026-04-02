import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <ng-content />
    <button (click)="deleteItem.emit()">
      <img
        class="h-5"
        ngSrc="assets/svg/trash.svg"
        width="20"
        height="20"
        alt="trash" />
    </button>
  `,
  host: {
    class: 'flex justify-between border border-gray-300 px-2 py-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class ListItemComponent {
  readonly deleteItem = output<void>();
}
