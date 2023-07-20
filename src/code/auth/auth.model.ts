export const PERMITTED_REDIRECT_KEY = 'protected-url';

export const NO_PERMISSION_ROUTE = 'protected';

export const PERMISSION_CLIENT_ID = 'dashboard-auth';

export interface AuthState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  permissions: PermissionDto[];
  claims: any;
}

export enum LoginType {
  AD = 'AD',
  MES = 'MES',
}

export interface UserInfo {
  employID: string;
  account: string;
  name: string;
  loginType: LoginType;
}

interface KeycloakPermissionDto {
  scopes?: string[];
  rsid: string;
  rsname: string;
}

//* Change interface if need to use another auth service
export type PermissionDto = KeycloakPermissionDto;
