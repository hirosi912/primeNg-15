import { createFeature, createReducer, on, Action } from '@ngrx/store';
import { AuthState } from './auth.models';
import { AuthActions, PermissionActions } from './actions';

export const initialState: AuthState = {
  userInfo: null,
  permissions: [],
  claims: null,
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state) => {
    return {
      ...state,
      isAuthenticated: true,
    };
  }),
  on(AuthActions.loadUserInfoSuccess, (state, { userInfo }) => {
    return {
      ...state,
      userInfo,
    };
  }),
  on(AuthActions.loadUserClaimsSuccess, (state, { claims }) => {
    return {
      ...state,
      claims,
    };
  }),
  on(PermissionActions.loadPermissionsSuccess, (state, { data }) => {
    return {
      ...state,
      permissions: data,
    };
  })
);

export function authReducer(
  // name: 'auth',
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}

// export const authReducer = createFeature({
//   name: 'auth',
//   reducer: createReducer<AuthState>(
//     initialState,
//     on(AuthActions.loginSuccess, (state) => {
//       return {
//         ...state,
//         isAuthenticated: true,
//       };
//     }),
//     on(AuthActions.loadUserInfoSuccess, (state, { userInfo }) => {
//       return {
//         ...state,
//         userInfo,
//       };
//     }),
//     on(AuthActions.loadUserClaimsSuccess, (state, { claims }) => {
//       return {
//         ...state,
//         claims,
//       };
//     }),
//     on(PermissionActions.loadPermissionsSuccess, (state, { data }) => {
//       return {
//         ...state,
//         permissions: data,
//       };
//     })
//   ),
// });
