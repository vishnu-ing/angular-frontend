import { Component } from '@angular/core';
import * as AuthActions from '../../store/auth/auth.actions'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private store: Store){}

  logout(){
    this.store.dispatch(AuthActions.logout())
  }

}
