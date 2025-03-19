// // jwt.interceptor.ts
// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './app/Service/auth.service'; 

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const token = this.authService.getToken();
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './app/Service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   const token = this.authService.getToken();

  //   // Check if token exists but is expired
  //   if (token && !this.authService.isLoggedIn()) {
  //     this.handleTokenExpiration();
  //     return throwError(() => new Error('Token expired'));
  //   }

  //   // Add token to request if valid
  //   if (token) {
  //     request = this.addToken(request, token);
  //   }

  //   // Handle 401 errors from the server
  //   return next.handle(request).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         this.handleTokenExpiration();
  //       }
  //       return throwError(() => error);
  //     })
  //   );
  // }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log("Token:", token); // Log token to ensure it's being sent
    
    if (token) {
      request = this.addToken(request, token);
    }
  
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleTokenExpiration();
        }
        return throwError(() => error);
      })
    );
  }
  

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleTokenExpiration(): void {
    this.authService.logout();
    alert('Your session has expired. Please log in again.');
    this.router.navigate(['/login']); // Adjust the route as needed
  }
}