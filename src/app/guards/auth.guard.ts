import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn = this.authService.isAuthenticated();
    if (!loggedIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }
    return loggedIn;
  }
}
