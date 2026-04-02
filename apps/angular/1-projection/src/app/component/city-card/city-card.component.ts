import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [items]="cities()" (addItem)="addCity()">
      <img
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="city-img" />
      <ng-template [cardRow]="cities()" let-city>
        <app-list-item (deleteItem)="deleteCity(city.id)">
          <span>{{ city.name }}</span>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  host: {
    style: '--card-bg: rgba(0, 100, 250, 0.1);',
  },
  imports: [
    CardComponent,
    ListItemComponent,
    NgOptimizedImage,
    CardRowDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  readonly cities = computed(() => this.store.cities());

  addCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }
}
