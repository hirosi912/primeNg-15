import { PermissionService } from './../services/permission.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { 
  // delay, 
  filter, 
  map, 
  // takeWhile 
} from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
// import { selectPermissions } from '../selectors';
import { selectPermissions } from '../auth.selectors';
import { NO_PERMISSION_ROUTE } from '../auth.models';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectPermissions).pipe(
      filter((p) => Boolean(p.length)),
      map((p) => {
        const url = state.url?.split('?')[0];
        console.log(url);
        const pass = this.permissionService.hasPagePermission(url);
        if (!pass) {
          this.permissionService.setPermittedUrl(url);
          this.router.navigate([NO_PERMISSION_ROUTE]);
        }
        return true;
      })
    );
  }

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private store: Store
  ) {}
}
