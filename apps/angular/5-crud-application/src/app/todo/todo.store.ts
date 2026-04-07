import { computed, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { finalize } from 'rxjs';
import { TodoApiService } from './todo-api.service';
import { TodoState } from './todo.store.types';
import { Todo } from './todo.types';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  processingIds: [],
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    hasError: computed(() => store.error !== null),
  })),
  withMethods((store, todoApi = inject(TodoApiService)) => ({
    loadTodos(): void {
      patchState(store, { loading: true, error: null });

      todoApi
        .getTodos()
        .pipe(finalize(() => patchState(store, { loading: false })))
        .subscribe({
          next: (todos) => patchState(store, { todos }),
          error: () => patchState(store, { error: 'Failed to load todos' }),
        });
    },
    updateTodo(todo: Todo): void {
      patchState(store, {
        processingIds: [...store.processingIds(), todo.id],
        loading: true,
      });

      const payload = { title: randText(), id: todo.id };

      todoApi
        .updateTodo(payload)
        .pipe(
          finalize(() =>
            patchState(store, {
              loading: false,
              processingIds: store
                .processingIds()
                .filter((id) => id !== todo.id),
            }),
          ),
        )
        .subscribe({
          next: (updatedTodo) =>
            patchState(store, {
              todos: store
                .todos()
                .map((currentTodo) =>
                  currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
                ),
            }),
          error: () => patchState(store, { error: 'Failed to update todo' }),
        });
    },
    deleteTodo(todoId: number): void {
      patchState(store, {
        processingIds: [...store.processingIds(), todoId],
        loading: true,
      });

      todoApi
        .deleteTodo(todoId)
        .pipe(
          finalize(() =>
            patchState(store, {
              loading: false,
              processingIds: store
                .processingIds()
                .filter((id) => id !== todoId),
            }),
          ),
        )
        .subscribe({
          next: () =>
            patchState(store, {
              todos: store
                .todos()
                .filter((currentTodo) => currentTodo.id !== todoId),
            }),
          error: () => patchState(store, { error: 'Failed to delete todo' }),
        });
    },
    isProcessing(id: number): boolean {
      return store.processingIds().includes(id);
    },
  })),
);
