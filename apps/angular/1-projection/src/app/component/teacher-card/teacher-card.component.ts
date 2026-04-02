import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [items]="teachers()" (addItem)="addTeacher()">
      <img
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="teacher" />
      <ng-template [cardRow]="teachers()" let-teacher>
        <app-list-item (deleteItem)="deleteTeacher(teacher.id)">
          <span>{{ teacher.firstName }}</span>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  host: {
    style: '--card-bg: rgba(250, 0, 0, 0.1);',
  },
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardRowDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  readonly teachers = computed(() => this.store.teachers());

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
