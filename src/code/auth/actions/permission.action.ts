import { createAction, props } from '@ngrx/store';

export const loadPermissions = createAction('[Permission] Load Permissions');

export const loadPermissionsSuccess = createAction(
  '[Permission] Load Permissions Success',
  props<{ data: any }>()
);

export const loadPermissionsFail = createAction(
  '[Permission] Load Permissions Fail',
  props<{ error: string }>()
);
