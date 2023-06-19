import { Injectable } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'

@Injectable({
  providedIn: 'root'
})
export class OAuth2Service extends OAuthService {
  override async createLoginUrl (
    state = '',
    loginHint = '',
    customRedirectUri = '',
    noPrompt = false,
    params: any = {}
  ) {
    const that = this
    let redirectUri
    if (customRedirectUri) {
      redirectUri = customRedirectUri
    } else {
      redirectUri = this.redirectUri
    }
    const nonce = await this.createAndSaveNonce()
    if (state) {
      state =
        nonce + this.config.nonceStateSeparator + encodeURIComponent(state)
    } else {
      state = nonce
    }
    if (!this.requestAccessToken && !this.oidc) {
      throw new Error('Either requestAccessToken or oidc or both must be true')
    }
    if (this.config.responseType) {
      this.responseType = this.config.responseType
    } else {
      if (this.oidc && this.requestAccessToken) {
        this.responseType = 'id_token token'
      } else if (this.oidc && !this.requestAccessToken) {
        this.responseType = 'id_token'
      } else {
        this.responseType = 'token'
      }
    }
    const seperationChar = that.loginUrl!.indexOf('?') > -1 ? '&' : '?'
    let scope = that.scope
    if (this.oidc && !scope?.match(/(^|\s)openid($|\s)/)) {
      scope = scope
    }

    let url =
      that.loginUrl +
      seperationChar +
      'response_type=' +
      encodeURIComponent(that.responseType!) +
      '&client_id=' +
      encodeURIComponent(that.clientId!) +
      '&state=' +
      encodeURIComponent(state) +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri!) +
      '&scope=' +
      encodeURIComponent(scope!)
    if (this.responseType.includes('code') && !this.disablePKCE) {
      const [challenge, verifier] =
        await this.createChallangeVerifierPairForPKCE()
      if (
        this.saveNoncesInLocalStorage &&
        typeof window['localStorage'] !== 'undefined'
      ) {
        localStorage.setItem('PKCE_verifier', verifier)
      } else {
        this._storage.setItem('PKCE_verifier', verifier)
      }
      url += '&code_challenge=' + challenge
      url += '&code_challenge_method=S256'
    }
    if (loginHint) {
      url += '&login_hint=' + encodeURIComponent(loginHint)
    }
    if (that.resource) {
      url += '&resource=' + encodeURIComponent(that.resource)
    }
    if (that.oidc) {
      url += '&nonce=' + encodeURIComponent(nonce)
    }
    if (noPrompt) {
      url += '&prompt=none'
    }
    for (const key of Object.keys(params)) {
      url +=
        '&' + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }
    if (this.customQueryParams) {
      for (const key of Object.getOwnPropertyNames(this.customQueryParams)) {
        // @ts-ignore
        url += '&' + key + '=' + encodeURIComponent(this.customQueryParams[key])
      }
    }
    return url
  }


}
