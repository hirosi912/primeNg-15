import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, interval, merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  // map,
  distinctUntilChanged,
  // mapTo,
  filter
} from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AnimationsService } from '../animations/animations.service';
import { TitleService } from '../title/title.service';
import { NavsService } from '../navs/navs.service';
import { ThemeService } from '../theme/theme.service';

import {
  actionSettingsChangeLanguage,
  actionSettingsChangeSideExpand,
  actionSettingsChangeTheme,
  actionSettingsChangeThemeMode,
  // actionSettingsChangeNavs
} from './settings.actions';
import {
  selectSettingsLanguage,
  selectTheme,
  selectThemeMode
} from './settings.selectors';
import { State } from './settings.model';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('css-init-effect-trigger');


@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private route :ActivatedRoute,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private navsService: NavsService,
    private titleService: TitleService,
    private themeService: ThemeService,
    private animationsService: AnimationsService,
    private translateService: TranslateService
  ) { }

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionSettingsChangeLanguage,
          actionSettingsChangeSideExpand,
          actionSettingsChangeTheme,
          actionSettingsChangeThemeMode,
          // actionSettingsChangeNavs
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );

  updateTheme = createEffect(
    () =>
      merge(
        INIT,
        this.actions$.pipe(
          ofType(
            actionSettingsChangeTheme,
            actionSettingsChangeThemeMode
          )
        )
      ).pipe(
        withLatestFrom(
          combineLatest([
            this.store.pipe(select(selectTheme)),
            this.store.pipe(select(selectThemeMode))
          ])
        ),
        tap(([action, [theme, mode]]) =>
          this.themeService.switchTheme(theme, mode)
        )
      ),
    { dispatch: false }
  );

  setTranslateServiceLanguage = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap(language => this.translateService.use(language))
      ),
    { dispatch: false }
  );

  setNavs = createEffect(
    () =>
      merge(
        // this.actions$.pipe(ofType(actionSettingsChangeNavs)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this.navsService.setNavs(
            this.router.routerState.snapshot.root,
            this.translateService
          );
        })
      ),
    { dispatch: false }
  );

  setTitle = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(actionSettingsChangeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this.titleService.setTitle(
            this.router.routerState.snapshot.root,
            this.translateService
          );
        })
      ),
    { dispatch: false }
  );
}
