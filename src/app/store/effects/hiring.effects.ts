import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service'; 
import * as HiringActions from '../actions/hiring.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class HiringEffects {

  constructor(
    private actions$: Actions, 
    private apiService: ApiService
  ) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      //listen for load onboarding
      ofType(HiringActions.loadEmployees), 
      
      mergeMap(() =>
        this.apiService.get<any[]>('hiring/applications').pipe( 
          // dispatch success action
          map(employees => HiringActions.loadEmployeesSuccess({ employees })),
          // dispatch fail action
          catchError(error => of(HiringActions.loadEmployeesFailure({ error })))
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HiringActions.updateEmployeeStatus),
      mergeMap(({ userId, status, feedback }) =>
        //call the post request
        this.apiService.post<any>('hiring/decision', { userId, status, feedback }).pipe(
          map(updatedUser => HiringActions.updateEmployeeStatusSuccess({ user: updatedUser })),
          catchError(error => of(HiringActions.updateEmployeeStatusFailure({ error })))
        )
      )
    )
  );

  loadTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HiringActions.loadRegistrationHistory),
      mergeMap(() =>
        this.apiService.get<any[]>('hiring/tokens').pipe(
          map(tokens => HiringActions.loadRegistrationHistorySuccess({ tokens })),
          catchError(error => of(HiringActions.loadRegistrationHistoryFailure({ error })))
        )
      )
    )
  );

  generateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HiringActions.generateToken),
      
      mergeMap(({ email, name }) =>
        this.apiService.post<any>('hiring/token', { email, name }).pipe(
          map(() => {
            alert(`Invitation sent to ${email}!`); 
            return HiringActions.loadRegistrationHistory();
          }),
          catchError(error => {
            alert('Failed to send invitation. Check console.');
            return of({ type: '[Hiring] Generate Token Failure', error });
          })
        )
      )
    )
  );
}