import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, UpdateTodoPayload } from './todo.types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private readonly http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(BASE_URL);
  }

  updateTodo(payload: UpdateTodoPayload): Observable<Todo> {
    return this.http.put<Todo>(`${BASE_URL}/${payload.id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
