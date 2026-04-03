import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoApiService } from './todo/todo-api.service';
import { Todo } from './todo/todo.types';

@Component({
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly todoApi = inject(TodoApiService);

  protected readonly todos = signal<Todo[]>([]);

  constructor() {
    this.loadTodos();
  }

  protected updateTodo(todo: Todo): void {
    const payload = { title: randText(), id: todo.id };
    this.todoApi.updateTodo(payload).subscribe((updatedTodo) => {
      this.todos.update((todos) => {
        return todos.map((currentTodo) =>
          currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
        );
      });
    });
  }

  private loadTodos(): void {
    this.todoApi.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }
}
