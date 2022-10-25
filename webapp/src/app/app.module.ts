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
import {
  OrderControllerService,
  ProductControllerService,
  RatingSystemControllerService,
  UserControllerService
} from "./api";
import {NavigationBarComponent} from './components/shared/navigation-bar/navigation-bar.component';
import {AvatarModule} from "primeng/avatar";
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {SplitButtonModule} from "primeng/splitbutton";
import {MenuModule} from "primeng/menu";
import {SidebarModule} from "primeng/sidebar";
import {SlideMenuModule} from "primeng/slidemenu";
import {
  PersonalInformationComponent
} from './components/user/user-profile/personal-information/personal-information.component';
import {MyOrdersComponent} from './components/user/user-profile/my-orders/my-orders.component';
import {MyAddressesComponent} from './components/user/user-profile/my-addresses/my-addresses.component';
import {MyReviewsComponent} from './components/user/user-profile/my-reviews/my-reviews.component';
import {WishlistComponent} from './components/user/user-profile/wishlist/wishlist.component';
import {SplitterModule} from "primeng/splitter";
import {InputMaskModule} from "primeng/inputmask";
import {PasswordModule} from "primeng/password";
import {headerAcceptInterceptor} from "./helpers/HeaderAcceptsInterceptor";
import {CarouselModule} from "primeng/carousel";
import {
  TopRecommendedProducts
} from "./components/home-page/top-recommanded-products/top-recommended-products.component";
import {ProductOverviewComponent} from './components/product-page/product-overview/product-overview.component';
import {TabViewModule} from "primeng/tabview";
import {FooterComponent} from './components/shared/footer/footer.component';
import {ShoppingCartComponent} from './components/user/shopping-cart/shopping-cart.component';
import {DropdownModule} from "primeng/dropdown";
import {BadgeModule} from "primeng/badge";
import {InputNumberModule} from "primeng/inputnumber";
import {MenubarModule} from "primeng/menubar";
import {DividerModule} from "primeng/divider";
import { OrderStatusMessageComponent } from './components/user/user-profile/my-orders/order-status-message/order-status-message.component';
import {RatingModule} from "primeng/rating";
import {DataViewModule} from "primeng/dataview";
import { SpinnerLoadingAnimationComponent } from './components/shared/spinner-loading-animation/spinner-loading-animation.component';
import { SidenavListComponent } from './components/shared/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SelectButtonModule} from "primeng/selectbutton";
import { OrderSummaryComponent } from './components/user/user-profile/my-orders/order-summary/order-summary.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
    UserComponent,
    HomePageComponent,
    DarkBannerComponent,
    FrontPageHeroComponent,
    CallToActionComponent,
    ProductPageComponent,
    ProductItemComponent,
    NavigationBarComponent,
    UserProfileComponent,
    PersonalInformationComponent,
    MyOrdersComponent,
    MyAddressesComponent,
    MyReviewsComponent,
    WishlistComponent,
    TopRecommendedProducts,
    ProductOverviewComponent,
    FooterComponent,
    ShoppingCartComponent,
    OrderStatusMessageComponent,
    SpinnerLoadingAnimationComponent,
    SidenavListComponent,
    OrderSummaryComponent,
    CheckoutComponent
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
        AvatarModule,
        SplitButtonModule,
        MenuModule,
        SidebarModule,
        SlideMenuModule,
        SplitterModule,
        InputMaskModule,
        PasswordModule,
        CarouselModule,
        TabViewModule,
        DropdownModule,
        BadgeModule,
        InputNumberModule,
        MenubarModule,
        DividerModule,
        RatingModule,
        DataViewModule,
        FlexLayoutModule,
        SelectButtonModule
    ],
  exports: [],
  providers: [
    authInterceptorProviders, headerAcceptInterceptor,
    OrderControllerService, ProductControllerService, UserControllerService,
    RatingSystemControllerService,
    MessageService,
    ProductControllerService,
    UserControllerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
