import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { OAuthModule } from 'angular-oauth2-oidc';

import { reducers, metaReducers } from '../core.state';
import { AuthRoutingModule } from './auth-routing.module';
import { NoPermissionPageComponent } from 'src/app/features/no-permission-page/no-permission-page.component';

@NgModule({
  declarations: [NoPermissionPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    OAuthModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
  ]
})
export class AuthModule {}
