import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Todo } from '../todo.types';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();
  readonly processing = input(false);

  readonly updateClicked = output<Todo>();
  readonly deleteClicked = output<Todo>();

  protected update(): void {
    this.updateClicked.emit(this.todo());
  }

  protected delete(): void {
    this.deleteClicked.emit(this.todo());
  }
}
