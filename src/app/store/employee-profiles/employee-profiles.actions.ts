import { createAction, props } from '@ngrx/store';
import { Employee } from '../../interfaces';

export const loadEmployees = createAction('[EmployeeProfiles] Load Employees');
export const loadEmployeesSuccess = createAction(
  '[EmployeeProfiles] Load Employees Success',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[EmployeeProfiles] Load Employees Failure',
  props<{ error: string }>()
);

export const setSearchQuery = createAction(
  '[EmployeeProfiles] Set Search Query',
  props<{ query: string }>()
);
