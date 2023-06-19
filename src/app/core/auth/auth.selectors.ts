import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectPermissions = createSelector(
  selectAuthState,
  (state: AuthState) => state.permissions
);

export const selectClaims = createSelector(
  selectAuthState,
  (state: AuthState) => state.claims
);
