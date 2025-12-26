import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HiringState } from '../reducers/hiring.reducer';

//select the feature state
export const selectHiringState = createFeatureSelector<HiringState>('hiring');

// raw list
export const selectAllEmployees = createSelector(
  selectHiringState,
  (state) => state.employees
);

//pending user
export const selectPendingUsers = createSelector(
  selectAllEmployees,
  (employees) => employees.filter(user => user.onboardingStatus === 'Pending')
);

//approved user
export const selectApprovedUsers = createSelector(
  selectAllEmployees,
  (employees) => employees.filter(user => user.onboardingStatus === 'Approved')
);

//rejected user
export const selectRejectedUsers = createSelector(
  selectAllEmployees,
  (employees) => employees.filter(user => user.onboardingStatus === 'Rejected')
);

export const selectRegistrationTokens = createSelector(
  selectHiringState,
  (state) => state.registrationTokens || []
);