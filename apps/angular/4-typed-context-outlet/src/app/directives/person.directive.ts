import { Directive } from '@angular/core';
import { Person } from '../person.component';

export interface PersonContext {
  $implicit: Person;
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'ng-template[personDir]' })
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown,
  ): ctx is PersonContext {
    return true;
  }
}
