import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('token');
    const isLoginRoute = route.routeConfig?.path === 'login';

    // ❌ Logged in users should NOT see login page
    if (isLoggedIn && isLoginRoute) {
      this.router.navigate(['/']);
      return false;
    }

    // ❌ Not logged in users should NOT see protected pages
    if (!isLoggedIn && !isLoginRoute) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

