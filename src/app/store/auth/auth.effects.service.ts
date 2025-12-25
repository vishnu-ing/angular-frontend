import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from './auth.service';
import { mergeMap, map, catchError, of, tap, merge } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthEffectsService {
  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({username,password}) => 
        this.authService.login(username,password).pipe(
          tap(res => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user',JSON.stringify(res.user))
          }),
          map(res => 
            AuthActions.loginSuccess({
              token:res.token,
              user:res.user
            })
          ),
          catchError(err =>
            of(AuthActions.loginFailure({error: err.error?.message || "Login Failed"}))
          )
        )
      )
    )
  )

  //This effect should not return an action so dispatch:false
  loginSuccessNavigate$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(['/home'])
      })
    ),
     { dispatch: false }
  )

  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login', { replaceUrl: true });
      })
    ),
     { dispatch: false }
  )
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
