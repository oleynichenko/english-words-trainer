import {NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    AngularFireAuthModule,
    AuthRoutingModule,
    SharedModule
  ]
})

export class AuthModule { }
