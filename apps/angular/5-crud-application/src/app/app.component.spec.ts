import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { LoadingService } from './interceptors/loading.service';
import { TodoApiService } from './todo/todo-api.service';
import { Todo } from './todo/todo.types';

describe(AppComponent.name, () => {
  const todos: Todo[] = [
    { id: 1, userId: 1, title: 'First Todo', completed: false },
    { id: 2, userId: 2, title: 'Second Todo', completed: true },
  ];

  async function setup() {
    const todoApiMock = {
      getTodos: jest.fn().mockReturnValue(of(todos)),
      updateTodo: jest
        .fn()
        .mockReturnValue(
          of({ ...todos[0], title: 'Updated title', completed: true }),
        ),
      deleteTodo: jest.fn().mockReturnValue(of(void 0)),
    };

    await render(AppComponent, {
      imports: [NoopAnimationsModule, MatSnackBarModule],
      providers: [
        LoadingService,
        { provide: TodoApiService, useValue: todoApiMock },
      ],
    });

    return { todoApiMock };
  }

  it('renders todos from api', async () => {
    await setup();

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
  });

  it('removes a todo after delete', async () => {
    const user = userEvent.setup();
    await setup();

    const deleteButtons = screen.queryAllByRole('button', { name: 'Delete' });
    await user.click(deleteButtons[0]);

    expect(screen.queryByText('First Todo')).not.toBeInTheDocument();
    expect(screen.queryByText('Second Todo')).toBeInTheDocument();
  });

  it('updates the targeted todo', async () => {
    const user = userEvent.setup();
    await setup();

    const updateButtons = screen.queryAllByRole('button', { name: 'Update' });
    await user.click(updateButtons[0]);

    expect(screen.getByText('Updated title')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
  });
});
