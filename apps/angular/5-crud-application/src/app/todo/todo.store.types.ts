import { Todo } from './todo.types';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  processingIds: number[];
}
