import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
// import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import {
//   FaIconLibrary,
//   FontAwesomeModule
// } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/effects/auth.effects';
import { PermissionEffects } from './auth/effects/permission.effects';

import { environment } from '../../environments/environment';

import {
  AppState,
  // reducers,
  // metaReducers,
  selectRouterState
} from './core.state';
import { selectIsAuthenticated } from './auth/auth.selectors';
// import { authReducer} from './auth/auth.reducer';
import { TitleService } from './title/title.service';
import { NavsService, Nav } from './navs/navs.service';
import { ThemeService } from './theme/theme.service';
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations,
  listAnimation
} from './animations/route.animations';
import { AnimationsService } from './animations/animations.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuth2Service } from './auth/services/oauth2.service';

import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { LocalStorageService } from './local-storage/local-storage.service';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { NotificationService } from './notifications/notification.service';
import { SettingsEffects } from './settings/settings.effects';
import {
  selectSettingsLanguage,
  selectSettingsSideExpand,
  selectTheme,
  selectThemeMode
} from './settings/settings.selectors';

export {
  TitleService,
  NavsService,
  Nav,
  ThemeService,
  routeAnimations,
  listAnimation,
  AppState,
  LocalStorageService,
  selectIsAuthenticated,
  ROUTE_ANIMATIONS_ELEMENTS,
  AnimationsService,
  selectRouterState,
  NotificationService,
  selectSettingsLanguage,
  selectSettingsSideExpand,
  selectTheme,
  selectThemeMode
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    AuthModule,
    // StoreModule.forFeature(authReducer),
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      AuthEffects,
      PermissionEffects,
      SettingsEffects
    ]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'CMS-a15'
        }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: OAuthService,
      useClass: OAuth2Service,
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    TranslateService,
    MessageService
  ],
  exports: [
    TranslateModule
  ]
})
export class CoreModule {

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
