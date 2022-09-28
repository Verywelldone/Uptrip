import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';
import {UserComponent} from './components/user/user.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationModule} from "./services/auth/authentication/authentication.module";
import {RegisterComponent} from './components/authentication/register/register.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {authInterceptorProviders} from "./services/auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AuthenticationModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ToastModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
