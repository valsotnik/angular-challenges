import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { PersonDirective } from './directives/person.directive';

export interface Person {
  name: string;
  age: number;
}

@Component({
  imports: [NgTemplateOutlet],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'person',
  template: `
    <ng-container
      [ngTemplateOutlet]="personTemplateRef() || emptyRef"
      [ngTemplateOutletContext]="{
        $implicit: person(),
      }" />

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  person = input.required<Person>();

  personTemplateRef = contentChild(PersonDirective, {
    read: TemplateRef,
  });
}
