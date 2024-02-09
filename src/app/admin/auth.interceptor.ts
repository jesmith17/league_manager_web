import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private jwtHelper = new JwtHelperService();

    constructor(private router: Router) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        let token = localStorage.getItem('currentUser');
        if (req.url.indexOf('/admin/login') !== -1) {
            return next.handle(req.clone());
        }
        if (token == null || this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(['/admin/login']);
        } else {
            req.headers.append('Authorization', `Bearer ${token}`);
        }
        const clonedRequest = req.clone();
        return next.handle(clonedRequest).pipe(tap(
          (event: HttpEvent<any>) => {}, (err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                // handle 401 errors
                this.router.navigate(['/admin/login']);
            }}
          )
        );
    }
}
