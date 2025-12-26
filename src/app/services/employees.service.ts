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
}
