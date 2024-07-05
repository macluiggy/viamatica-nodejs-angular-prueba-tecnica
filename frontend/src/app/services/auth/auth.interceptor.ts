import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authToken = storageService.getToken();
  

  const toarstrService = inject(ToastrService);
  const router = inject(Router);

  // "if" because the endpoint for singup and singin doesn't need the token
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });
  }

  return next(req).pipe(
    tap((response: any) => {
      // Handle successful responses
      const body = response.body;
      if (body) {
        const message = body.message;
        if (message && message !== 'OK') {
          toarstrService.success(message, '', {});
        }
      }
    }),
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
          router.navigate(['/login']);
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
          toarstrService.error(err.error.message, 'Internal Server Error', {});
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
