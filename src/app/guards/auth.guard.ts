import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { Store } from '@ngrx/store';
import { State } from '../state/main.state';
@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  private loggedIn: boolean = false;
  constructor(
    private router: Router,
    private store: Store<State>
  ) {
    this.store.select('combinedReducer', 'authStoreReducer')
      .subscribe((state: State) => {
        this.loggedIn = state.isLoggedIn;
      });
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loggedIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }
    return true;
  }
}
