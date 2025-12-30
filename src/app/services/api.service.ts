import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${environment.apiBaseUrl}/${path}`);
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(
      `${environment.apiBaseUrl}/${path}`,
      body
    );
  }

  patch<T>(path: string, body: any): Observable<T> {
    return this.http.patch<T>(
      `${environment.apiBaseUrl}/${path}`,
      body
    );
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(
      `${environment.apiBaseUrl}/${path}`
    );
  }
}
