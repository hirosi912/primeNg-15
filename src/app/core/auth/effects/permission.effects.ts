import { AuthService } from './../services/auth.service';
// import { AuthApiService } from './../services/auth-api.service';
import { PermissionService } from './../services/permission.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  map,
  switchMap,
  // withLatestFrom,
} from 'rxjs/operators';
import { PermissionActions } from '../actions';
// import * as PermissionActions from '../auth.actions';
// import { AuthSelectors } from '../selectors';
// import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class PermissionEffects {
  constructor(
    private actions$: Actions,
    // private store: Store,
    private authService: AuthService,
    private permissionService: PermissionService
  ) { }

  readonly handleLoadPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.loadPermissions),
      filter(() =>
        Boolean(
          this.authService.authConfig && this.authService.authConfig.clientId
        )
      ),
      switchMap(() => {
        return this.permissionService.getPermissions$.pipe(
          map((data) => {
            return PermissionActions.loadPermissionsSuccess({ data: data });
          }),
          catchError((error) => {
            return of(PermissionActions.loadPermissionsFail({ error }));
          })
        );
      })
    )
  );

}
