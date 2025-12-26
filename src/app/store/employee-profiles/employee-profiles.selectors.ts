import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeProfilesState } from './employee-profiles.reducers';

export const selectEmployeeProfilesState =
  createFeatureSelector<EmployeeProfilesState>('employeeProfiles');

export const selectEmployees = createSelector(
  selectEmployeeProfilesState,
  (state) => state.employees
);

export const selectSearchQuery = createSelector(
  selectEmployeeProfilesState,
  (state) => state.searchQuery
);

export const selectLoading = createSelector(
  selectEmployeeProfilesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectEmployeeProfilesState,
  (state) => state.error
);

export const selectFilteredAndSortedEmployees = createSelector(
  selectEmployees,
  selectSearchQuery,
  (employees, query) => {
    let filtered = employees;

    if (query) {
      const q = query.toLowerCase();
      filtered = employees.filter(
        (emp) =>
          emp.firstName?.toLowerCase().includes(q) ||
          emp.lastName?.toLowerCase().includes(q) ||
          emp.preferredName?.toLowerCase().includes(q) ||
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q)
      );
    }

    return filtered
      .map((emp) => ({
        ...emp,
        legalFullName: `${emp.firstName} ${
          emp.middleName ? emp.middleName + ' ' : ''
        }${emp.lastName}`.trim(),
        phone: emp.cellPhone,
        workAuthorizationTitle: emp.workAuthorization?.title || 'N/A',
      }))
      .sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
);

export const selectCount = createSelector(
  selectFilteredAndSortedEmployees, // Changed from selectFilteredEmployees
  (employees) => employees.length
);

export const selectEmployeeById = (id: string) =>
  createSelector(
    selectEmployees,
    (employees) => employees.find((e) => e._id === id) || null
  );
