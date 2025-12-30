import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../services/employees.service';
import { BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-all-approved',
  templateUrl: './show-all-approved.component.html',
  styleUrls: ['./show-all-approved.component.scss'],
})
export class ShowAllApprovedComponent{
  private search$ = new BehaviorSubject<string>('');

  normalizedSearch$ = this.search$.pipe(map((s) => s.trim().toLowerCase()));

  employee$ = this.hrEmployeeService
    .getEmployeesWithApprovedVisas()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  filteredEmployees$ = combineLatest([
    this.employee$,
    this.normalizedSearch$,
  ]).pipe(
    map(([employees, term]) =>
      employees.filter(
        (emp) =>
          emp.workAuth == 'F1' &&
          (emp.firstName.toLowerCase().includes(term) ||
            emp.lastName.toLowerCase().includes(term) ||
            emp.preferredName?.toLowerCase().includes(term))
      )
    )
  );

  constructor(
    private hrEmployeeService: EmployeesService,
    private router: Router
  ) {}

  onSearch(value: string) {
    this.search$.next(value);
  }

  goToInProgress() {
    this.router.navigate(['/visa-management/in-progress']);
  }
}
