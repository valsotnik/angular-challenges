import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoStore } from './todo/todo.store';
import { Todo } from './todo/todo.types';

@Component({
  imports: [MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly store = inject(TodoStore);

  protected readonly todos = signal<Todo[]>([]);

  constructor() {
    this.store.loadTodos();
  }
}
