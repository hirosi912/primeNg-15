import { AppState } from '../core.module';

export type Language = 'en' | 'zh-tw' | 'zh-cn';

export interface SettingsState {
  language: string;
  theme: string;
  themeMode: string;
  sideExpand: boolean;
  navs: Nav[];
}

export interface State extends AppState {
  settings: SettingsState;
}

export interface Navs {
  navs: Nav[];
}

export interface Nav {
    label: string;
    routerLink: string;
}
