import { Directive, input } from '@angular/core';

interface CardRowContext<T> {
  $implicit: T;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[cardRow]',
})
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    dir: CardRowDirective<T>,
    ctx: unknown,
  ): ctx is CardRowContext<T> {
    return true;
  }
}
