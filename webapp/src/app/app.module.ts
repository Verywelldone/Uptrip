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
import {TabMenuModule} from "primeng/tabmenu";
import {HomePageComponent} from './components/home-page/home-page.component';
import {DarkBannerComponent} from './components/home-page/dark-banner/dark-banner.component';
import {FrontPageHeroComponent} from './components/home-page/front-page-hero/front-page-hero.component';
import {CallToActionComponent} from './components/home-page/call-to-action/call-to-action.component';
import {ProductPageComponent} from './components/product-page/product-page.component';
import {ProductItemComponent} from './components/product-page/product-item/product-item.component';
import {ProductControllerService} from "./api";
import { NavigationBarComponent } from './components/shared/navigation-bar/navigation-bar.component';
import {AvatarModule} from "primeng/avatar";
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent, AdminComponent, LoginComponent, RegisterComponent, AuthenticationComponent, UserComponent, HomePageComponent, DarkBannerComponent, FrontPageHeroComponent, CallToActionComponent, ProductPageComponent, ProductItemComponent, NavigationBarComponent, UserProfileComponent
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
        PrimengModule,
        TabMenuModule,
        AvatarModule
    ],
  exports: [],
  providers: [authInterceptorProviders, MessageService, ProductControllerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
