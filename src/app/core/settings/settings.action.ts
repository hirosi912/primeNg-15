import { createAction, props } from '@ngrx/store';

import { Language, Nav } from './settings.model';

export const actionSettingsChangeLanguage = createAction(
  '[Settings] Change Language',
  props<{ language: Language }>()
);

export const actionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);

export const actionSettingsChangeThemeMode = createAction(
  '[Settings] Change Theme Mode',
  props<{ themeMode: string }>()
);

export const actionSettingsChangeSideExpand = createAction(
  '[Settings] Change Side Expand',
  props<{ sideExpand: boolean }>()
);

// export const actionSettingsChangeNavs = createAction(
//   '[Settings] Change Navs',
//   props<{ navs: Nav[] }>()
// );

