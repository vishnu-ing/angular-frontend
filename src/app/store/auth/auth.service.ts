import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = `${environment.apiBaseUrl}/hr/auth/login`
  constructor(private http: HttpClient) { }
  login(username: string, password: string){
    return this.http.post<any>(this.API, {username,password})
  }
}
