import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { ListDirective } from './directives/list.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'list',
  template: `
    @for (item of list(); track $index) {
      <ng-container
        [ngTemplateOutlet]="listTemplateRef() || emptyRef"
        [ngTemplateOutletContext]="{
          $implicit: item,
          index: $index,
        }" />
    }

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class ListComponent<T> {
  list = input.required<T[]>();

  listTemplateRef = contentChild(ListDirective, { read: TemplateRef });
}
