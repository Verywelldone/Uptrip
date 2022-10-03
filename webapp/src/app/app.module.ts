import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationModule} from "./services/auth/authentication/authentication.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {authInterceptorProviders} from "./services/auth/auth.interceptor";
import {MaterialModule} from "./helpers/material-module";

import {ToastModule} from "primeng/toast";
import {MessageService, SharedModule} from "primeng/api";
import {AdminComponent} from "./components/admin/admin.component";
import {LoginComponent} from "./components/authentication/login/login.component";
import {RegisterComponent} from "./components/authentication/register/register.component";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {UserComponent} from "./components/user/user.component";
import {PrimengModule} from "./helpers/primeng.module";


@NgModule({
  declarations: [
    AppComponent, AdminComponent, LoginComponent, RegisterComponent, AuthenticationComponent, UserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AuthenticationModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    MaterialModule,
    SharedModule,
    ToastModule,
    PrimengModule
  ],
  exports: [],
  providers: [authInterceptorProviders, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
