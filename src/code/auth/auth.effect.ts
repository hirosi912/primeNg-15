import { Injectable } from '@angular/core';
// import { AppSettingService } from '@app/core/boot/services/app-setting.service';
// import { AppSettingService } from '../services/auth-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { catchError, filter, first, map, of, switchMap, tap } from 'rxjs';
import { AuthActions } from '../actions';
// import * as AuthActions from '../auth.actions';
import { UserInfo } from '../auth.models';
import { AuthService } from '../services/auth.service';
import { AuthApiService } from '../services/auth-api.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthService,
    private authApiService: AuthApiService
  ) {}

  readonly handleInitAuthFlow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuthFlow),
      switchMap(() => {
        this.authService.initAuth();
        return [AuthActions.listenAuthEvents(), AuthActions.login()];
      })
    )
  );

  readonly handleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => {
        return this.authService.login$().pipe(
          filter((isLogin) => Boolean(isLogin)),
          map(() => {
            this.authService.refreshToken();
            return AuthActions.loginSuccess();
          })
        );
      })
    )
  );

  readonly handleLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return of(this.authService.logout()).pipe(
          map(() => AuthActions.logoutSuccess())
        );
      })
    )
  );

  readonly handleLoadUserClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserClaims),
      switchMap(() => {
        return [
          AuthActions.loadUserClaimsSuccess({
            claims: this.authService.identityClaims,
          }),
        ];
      })
    )
  );

  readonly handleLoadUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserInfo),
      switchMap((_) =>
        this.authApiService.getAppBootInfo().pipe(
          map(({ User }) => {
            const userInfo: UserInfo = {
              employID: '',
              account: User.UserAccount,
              name: User.UserName,
              loginType: User.AuthenticationStrategy,
            };
            return AuthActions.loadUserInfoSuccess({ userInfo });
          }),
          catchError((error) =>
            // TODO: 新增錯誤處理
            of()
          )
        )
      )
    )
  );

  readonly handleTokenReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.listenAuthEvents),
      switchMap(() => {
        return this.authService.tokenReceived$.pipe(
          tap(() => {
            console.warn(
              'ACCESS TOKEN TIME => ',
              moment(this.authService.accessTokenExpiration).toLocaleString()
            );
            this.store.dispatch(AuthActions.loadUserClaims());
            this.store.dispatch(AuthActions.loadUserInfo());
            // this.store.dispatch(PermissionActions.loadPermissions());
          })
        );
      })
    )
  );

  readonly handleStateErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.listenAuthEvents),
      switchMap(() => {
        return this.authService.stateErrors$.pipe(
          tap(() => {
            window.location.reload();
          })
        );
      })
    )
  );

  readonly handleAuthErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.listenAuthEvents),
      switchMap(() => {
        return this.authService.authErrors$.pipe(
          map((e) => {
            return AuthActions.logout();
          }),
          first()
        );
      })
    )
  );

  
}
