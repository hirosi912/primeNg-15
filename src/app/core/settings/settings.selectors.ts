import { createSelector } from '@ngrx/store';

import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectSettingsSideExpand = createSelector(
  selectSettings,
  (state: SettingsState) => state.sideExpand
);

export const selectSettingsLanguage = createSelector(
  selectSettings,
  (state: SettingsState) => state.language
);

export const selectSettingsNavs = createSelector(
  selectSettings,
  (state: SettingsState) => state.navs
);

export const selectTheme = createSelector(
  selectSettings,
  settings => settings.theme
);

export const selectThemeMode = createSelector(
  selectSettings,
  settings => settings.themeMode
);
