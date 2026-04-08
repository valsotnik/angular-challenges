import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    @if (small()) {
      <ng-container [ngTemplateOutlet]="titleTpl" />
      <ng-container [ngTemplateOutlet]="messageTpl" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="titleTpl" />
        </div>
        <ng-container [ngTemplateOutlet]="messageTpl" />
      </div>
    }

    <ng-template #titleTpl>
      <ng-content select="[title]" />
    </ng-template>

    <ng-template #messageTpl>
      <ng-content select="[message]" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  small = input(false);
}
