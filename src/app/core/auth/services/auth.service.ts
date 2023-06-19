import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { resourceToUrl } from '@app/shared/utils/url';
import { Store } from '@ngrx/store';
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { from } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as AuthSelectors from '../auth.selectors';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authConfig: AuthConfig = {
    ...environment.authConfig,
    issuer: resourceToUrl(environment.resources.auth).toString(),
    redirectUri: this.redirectUrl,
    showDebugInformation: !environment.production,
    // sessionChecksEnabled: true,
    strictDiscoveryDocumentValidation: false,
    requireHttps: false,
  };

  readonly isAuthenticated$ = this.store.select(
    AuthSelectors.selectIsAuthenticated
  );
  readonly login$ = () =>
    from(
      this.oauthService.loadDiscoveryDocumentAndLogin({
        customRedirectUri: this.redirectUrl,
        preventClearHashAfterLogin: false,
        disableNonceCheck: true,
      })
    );
  readonly isLogin$ = this.isAuthenticated$.pipe(
    map((done) => {
      return done && this.isAccessTokenValid;
    }),
    first()
  );

  readonly tokenReceived$ = this.oauthService.events.pipe(
    filter((e: OAuthEvent) => ['token_received'].includes(e.type))
  );

  readonly stateErrors$ = this.oauthService.events.pipe(
    filter((e: OAuthEvent) =>
      [
        'invalid_grant',
        'invalid_nonce_in_state',
        'session_terminated',
      ].includes(e.type)
    )
  );

  readonly authErrors$ = this.oauthService.events.pipe(
    filter((e: OAuthEvent) =>
      ['token_refresh_error', 'logout'].includes(e.type)
    )
  );

  get redirectUrl (): string {
    return `${window.location.origin}${window.location.pathname}`;
  }

  get isAccessTokenValid (): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get accessToken (): string {
    return this.oauthService.getAccessToken();
  }

  get accessTokenExpiration (): number {
    return this.oauthService.getAccessTokenExpiration();
  }

  get identityClaims (): any {
    return this.oauthService.getIdentityClaims();
  }

  initAuth (): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  refreshToken (): void {
    this.oauthService.refreshToken();
  }

  logout (): void {
    this.oauthService.redirectUri = this.redirectUrl;
    this.oauthService.logOut({ redirect_uri: this.redirectUrl });
  }

  constructor (
    private oauthService: OAuthService,
    private authApiService: AuthApiService,
    private router: Router,
    private store: Store
  ) {
    console.log(this.authConfig);
  }
}
