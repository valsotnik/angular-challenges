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
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [items]="students()" (addItem)="addStudent()">
      <img
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="student" />
      <ng-template [cardRow]="students()" let-student>
        <app-list-item (deleteItem)="deleteStudent(student.id)">
          <span>{{ student.firstName }}</span>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  host: {
    style: '--card-bg: rgba(0, 250, 0, 0.1);',
  },
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    CardRowDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  readonly students = computed(() => this.store.students());

  addStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
