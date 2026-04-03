import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { LoadingService } from './interceptors/loading.service';
import { TodoApiService } from './todo/todo-api.service';
import { Todo } from './todo/todo.types';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly todoApi = inject(TodoApiService);
  private readonly loadingService = inject(LoadingService);

  protected readonly todos = signal<Todo[]>([]);
  protected readonly isLoading = this.loadingService.isLoading;

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

  protected deleteTodo(id: number) {
    this.todoApi.deleteTodo(id).subscribe(() => {
      this.todos.update((todos) =>
        todos.filter((currentTodo) => currentTodo.id !== id),
      );
    });
  }

  private loadTodos(): void {
    this.todoApi.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }
}
