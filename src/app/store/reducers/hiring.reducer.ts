import { createReducer, on } from '@ngrx/store';
import * as HiringActions from '../actions/hiring.action';

export interface HiringState {
  employees: any[]; //store all users
  registrationTokens: any[];
  loading: boolean;
  error: any;
}

export const initialState: HiringState = {
  employees: [],
  registrationTokens: [],
  loading: false,
  error: null
};

export const HiringReducer = createReducer(
  initialState,

  //handle load
  on(HiringActions.loadEmployees, (state) => ({ ...state, loading: true })),
  
  on(HiringActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    loading: false,
    employees: employees 
  })),
  
  on(HiringActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  
  on(HiringActions.updateEmployeeStatusSuccess, (state, { user }) => {
    //replace the old version of this user with the new updated one
    const updatedEmployees = state.employees.map(emp => 
      emp._id === user._id ? user : emp
    );

    return {
      ...state,
      employees: updatedEmployees
    };
  }),
  // handle loading token history
  on(HiringActions.loadRegistrationHistorySuccess, (state, { tokens }) => ({
    ...state,
    registrationTokens: tokens
  }))
);

