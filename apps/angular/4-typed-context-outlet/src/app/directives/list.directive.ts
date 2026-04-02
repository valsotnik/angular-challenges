import { Directive, input } from '@angular/core';

export interface ListTemplateContext<T> {
  $implicit: T;
  index: number;
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'ng-template[listItems]' })
export class ListDirective<T> {
  listItems = input.required<T[]>();

  static ngTemplateContextGuard<TContext>(
    dir: ListDirective<TContext>,
    ctx: unknown,
  ): ctx is ListTemplateContext<TContext> {
    return true;
  }
}
