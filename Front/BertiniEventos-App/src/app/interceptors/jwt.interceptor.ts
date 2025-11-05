import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/identity/User';
import { AccountService } from '@app/services/account.service';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.accountService.currentUserValue;

    if (user?.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(error => {
      if (error) {
        localStorage.removeItem('user');
        this.accountService.logout();
        location.reload();
      }
      return throwError(error);
    })
    );
  }
}


// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {

//   constructor(private accountService: AccountService) {}

//   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     // let currentUser: User | null;

//     return this.accountService.currentUser$.pipe(
//       take(1),switchMap((user: User | null) => {
//         console.log('JWT Interceptor - User:', user);
//     if (user?.token) {
//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${user.token}`
//         }
//       });
//     }
//     return next.handle(req);
//   })
//   );
//   }
// }

// export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
//   const accountService = inject(AccountService);

//   return accountService.currentUser$.pipe(take(1), switchMap((user: User | null) => {
//     if (user && user?.token) {
//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${user.token}`
//         }
//       });
//     }
//     return next(req);
//   }));
// }

