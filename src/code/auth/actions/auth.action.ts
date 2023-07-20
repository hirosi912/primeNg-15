import { createAction, props } from '@ngrx/store';
import { UserInfo } from '../auth.models';

export const initAuthFlow = createAction('[Auth] Init auth flow');

export const listenAuthEvents = createAction('[Auth] Listen auth events');

export const login = createAction('[Auth] Login');

export const loginSuccess = createAction('[Auth] Login success');

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout success');

export const loadUserInfo = createAction('[Auth] Load user info');

export const loadUserInfoSuccess = createAction(
  '[Auth] Load user info success',
  props<{ userInfo: UserInfo }>()
);

export const loadUserClaims = createAction('[Auth] Load user claims');

export const loadUserClaimsSuccess = createAction(
  '[Auth] Load user claims success',
  props<{ claims: any }>()
);
