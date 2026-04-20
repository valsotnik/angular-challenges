import { Directive, effect, inject, input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: 'tr[currencyCode]',
  providers: [CurrencyService],
})
export class CurrencyRowDirective {
  currencyCode = input.required<string>();

  private readonly service = inject(CurrencyService);

  constructor() {
    effect(() => {
      this.service.setState({ code: this.currencyCode() });
    });
  }
}
