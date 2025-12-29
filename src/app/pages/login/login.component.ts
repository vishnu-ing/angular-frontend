import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading } from 'src/app/store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  loading = false;
  error: string | null = null;

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError)

  constructor(private router:Router,private store: Store){}

  handleSubmit(){
      this.store.dispatch(AuthActions.login({
        username:this.username,
        password:this.password
      }))
  }
}
