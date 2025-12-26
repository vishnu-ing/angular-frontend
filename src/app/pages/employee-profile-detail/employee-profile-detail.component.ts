import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../../interfaces/employee';
import {
  selectEmployeeById,
  selectEmployees,
} from '../../store/employee-profiles/employee-profiles.selectors';
import { loadEmployees } from '../../store/employee-profiles/employee-profiles.actions';

@Component({
  selector: 'app-employee-profile-detail',
  templateUrl: './employee-profile-detail.component.html',
  styleUrls: ['./employee-profile-detail.component.css'],
})
export class EmployeeProfileDetailComponent implements OnInit {
  employee$!: Observable<Employee | null>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectEmployees).subscribe((employees) => {
      if (employees.length === 0) {
        this.store.dispatch(loadEmployees());
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee$ = this.store.select(selectEmployeeById(id)).pipe(
        map((emp) => {
          if (!emp) return null;
          return {
            ...emp,
            legalFullName: `${emp.firstName} ${
              emp.middleName ? emp.middleName + ' ' : ''
            }${emp.lastName}`.trim(),
            phone: emp.cellPhone,
            workAuthorizationTitle: emp.workAuthorization?.title || 'N/A',
          };
        })
      );
    }
  }
}
