import { TableComponent } from '@angular-challenges/shared/ui';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { CurrencyRowDirective } from './currency-row.directive';
import { CurrencyPipe } from './currency.pipe';
import { Product, products } from './product.model';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[product]',
})
export class ProductDirective {
  static ngTemplateContextGuard(
    dir: ProductDirective,
    ctx: unknown,
  ): ctx is ProductContext {
    return true;
  }
}

@Component({
  imports: [
    TableComponent,
    CurrencyPipe,
    AsyncPipe,
    ProductDirective,
    CurrencyRowDirective,
  ],
  selector: 'app-root',
  template: `
    <table [items]="products">
      <ng-template #header>
        <tr>
          @for (col of displayedColumns; track $index) {
            <th>
              {{ col }}
            </th>
          }
        </tr>
      </ng-template>
      <ng-template #body product let-product>
        <tr [currencyCode]="product.currencyCode">
          <td>{{ product.name }}</td>
          <td>{{ product.priceA | currency | async }}</td>
          <td>{{ product.priceB | currency | async }}</td>
          <td>{{ product.priceC | currency | async }}</td>
        </tr>
      </ng-template>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
