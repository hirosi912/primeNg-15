
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AuthActions } from '../actions';
// import { AuthSelectors } from '../selectors';
// import { selectIsAuthenticated } from '../selectors';
import { selectIsAuthenticated } from '../auth.selectors';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  checkCodeAndRedirect(state: RouterStateSnapshot): boolean {
    //* Remove state in query string
    if (state.root.queryParamMap.has('code')) {
      const newUrl = state.url.slice(0, state.url.indexOf('?'));
      this.router.navigate([newUrl], { queryParams: {} });
      return false;
    }
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      filter((v) => v),
      map(() => {
        if (!this.authService.isAccessTokenValid) {
          this.store.dispatch(AuthActions.logout());
          return false;
        }
        return this.checkCodeAndRedirect(state);
      })
    );
  }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      filter((v) => v),
      map(() => {
        if (!this.authService.isAccessTokenValid) {
          this.store.dispatch(AuthActions.logout());
          return false;
        }
        return this.checkCodeAndRedirect(state);
      })
    );
  }
  
}
