import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/authentication/login/login.component";
import {RegisterComponent} from "./components/authentication/register/register.component";
import {UserComponent} from "./components/user/user.component";
import {AdminComponent} from "./components/admin/admin.component";
import {ProductPageComponent} from "./components/product-page/product-page.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {ProductOverviewComponent} from "./components/product-page/product-overview/product-overview.component";
import {ShoppingCartComponent} from "./components/user/shopping-cart/shopping-cart.component";
import {MyOrdersComponent} from "./components/user/user-profile/my-orders/my-orders.component";
import {WishlistComponent} from "./components/user/user-profile/wishlist/wishlist.component";
import {MyReviewsComponent} from "./components/user/user-profile/my-reviews/my-reviews.component";
import {OrderSummaryComponent} from "./components/user/user-profile/my-orders/order-summary/order-summary.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // {path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)},
  {path: 'user', component: UserComponent},
  {path: 'user/profile', component: UserProfileComponent},
  {path: 'user/orders', component: MyOrdersComponent},
  {path: 'user/orders/:orderUUID', component: OrderSummaryComponent},
  {path: 'user/wishlist', component: WishlistComponent},
  {path: 'user/reviews', component: MyReviewsComponent},
  {path: 'user/checkout', component: CheckoutComponent},

  {path: 'admin', component: AdminComponent},

  {path: 'home', component: HomePageComponent},
  {path: 'products', component: ProductPageComponent},

  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'products/:productId', component: ProductOverviewComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
