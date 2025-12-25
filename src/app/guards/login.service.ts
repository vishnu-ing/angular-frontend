import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, take } from 'rxjs';
import { selectIsLoggedIn, selectIsHR } from '../store/auth/auth.selectors';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{

  constructor(private store: Store, private router: Router) { }
  canActivate(){
    return combineLatest([
      this.store.select(selectIsLoggedIn),
      this.store.select(selectIsHR)
    ]).pipe(
      take(1),
      map(([isLoggedIn,isHR]) => 
        isLoggedIn && isHR
          ? this.router.createUrlTree(['/home']) 
          : true
        
    ))
  }
}
