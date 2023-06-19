import { SettingsState } from './settings.model';
import {
  actionSettingsChangeLanguage,
  actionSettingsChangeSideExpand,
  actionSettingsChangeTheme,
  actionSettingsChangeThemeMode,
  // actionSettingsChangeNavs
} from './settings.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  language: 'zh-tw',
  theme: 'indigo',
  themeMode: 'light',
  sideExpand: true,
  navs: []
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
    actionSettingsChangeSideExpand,
    actionSettingsChangeThemeMode,
    // actionSettingsChangeNavs,
    (state, action) => ({ ...state, ...action })
  ),
  on((state) => ({ ...state })
  ),
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
