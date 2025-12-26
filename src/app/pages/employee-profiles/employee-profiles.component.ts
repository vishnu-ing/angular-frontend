import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../interfaces/employee';
import {
  selectFilteredAndSortedEmployees,
  selectLoading,
  selectError,
  selectCount,
} from '../../store/employee-profiles/employee-profiles.selectors';
import {
  loadEmployees,
  setSearchQuery,
} from '../../store/employee-profiles/employee-profiles.actions';

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.css'],
})
export class EmployeeProfilesComponent implements OnInit {
  employees$: Observable<Employee[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  count$: Observable<number>;
  displayedColumns: string[] = [
    'name',
    'ssn',
    'workAuthorization',
    'phone',
    'email',
  ];

  constructor(private store: Store) {
    this.employees$ = this.store.select(selectFilteredAndSortedEmployees);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.count$ = this.store.select(selectCount);
  }

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
  }

  onSearchChange(query: string): void {
    this.store.dispatch(setSearchQuery({ query }));
  }

  getProfileLink(e: Employee): string {
    return `/employee-profiles/${e._id}`;
  }
}
