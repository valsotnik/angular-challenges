import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = error.status === 0 ? 'Network Error' : 'Request Failed';

      snackBar.open(message, 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      return throwError(() => error);
    }),
  );
};
