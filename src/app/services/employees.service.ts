import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private apiService: ApiService) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>('personal-info/employees'); // Changed from /employees
  }

  //Used for Visa Status Management - Show Only Approved
  getEmployeesWithApprovedVisas(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>('hr/employees/approved');
  }

  //Used for Visa Status Management - In Progress Only
  getInProgress(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>('hr/employees/in-progress');
  }

  updateStatus(visaId: string, body: { status: string; feedback?: string }) {
    return this.apiService.patch(`hr/employees/${visaId}/status`, body);
  }

  notify(visaId: string) {
    return this.apiService.post(`hr/employees/${visaId}/notify`, {});
  }
}
