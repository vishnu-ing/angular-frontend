import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsSet from './employee-profiles.actions';
import { EmployeesService } from '../../services';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeProfilesEffectsService {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsSet.loadEmployees),
      mergeMap(() =>
        this.employeesService.getAllEmployees().pipe(
          map((employees) => ActionsSet.loadEmployeesSuccess({ employees })),
          catchError((err) =>
            of(
              ActionsSet.loadEmployeesFailure({
                error: err.error?.message || 'Failed to load employees',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService
  ) {}
}
