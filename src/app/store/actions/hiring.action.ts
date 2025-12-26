import { createAction, props } from '@ngrx/store';

// data loading
export const loadEmployees = createAction('[Hiring] Load Employees');
export const loadEmployeesSuccess = createAction(
  '[Hiring] Load Employees Success',
  props<{ employees: any[] }>() 
);
export const loadEmployeesFailure = createAction(
  '[Hiring] Load Employees Failure',
  props<{ error: any }>()
);

// HR hiring actions
export const loadRegistrationHistory = createAction('[Hiring] Load Registration History');
export const loadRegistrationHistorySuccess = createAction(
  '[Hiring] Load Registration History Success',
  props<{ tokens: any[] }>()
);
export const loadRegistrationHistoryFailure = createAction(
  '[Hiring] Load Registration History Failure',
  props<{ error: any }>()
);

export const generateToken = createAction(
  '[Hiring] Generate Token',
  props<{ email: string; name: string }>()
);

export const updateEmployeeStatus = createAction(
  '[Hiring] Update Employee Status',
  props<{ userId: string; status: string; feedback: string }>()
);

export const updateEmployeeStatusSuccess = createAction(
  '[Hiring] Update Employee Status Success',
  props<{ user: any }>() 
);

export const updateEmployeeStatusFailure = createAction(
  '[Hiring] Update Employee Status Failure',
  props<{ error: any }>()
);