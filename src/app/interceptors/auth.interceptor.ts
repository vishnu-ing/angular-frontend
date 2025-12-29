import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    //If there is no token it means the user is NOT logged in 
    if(!token){
      return next.handle(req);
    }

    //If there is a token then each request header should allow tokens
    return next.handle(
      req.clone({
        headers:req.headers.set('Authorization',`Bearer ${token}`)
      })
    )
  }
}
