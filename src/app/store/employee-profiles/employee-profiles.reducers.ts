import { createReducer, on } from '@ngrx/store';
import * as Actions from './employee-profiles.actions';
import { Employee } from '../../interfaces';

export interface EmployeeProfilesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: EmployeeProfilesState = {
  employees: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const employeeProfilesReducer = createReducer(
  initialState,
  on(Actions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
    error: null,
  })),
  on(Actions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  }))
);
