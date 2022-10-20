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

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // {path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)},
  {path: 'user', component: UserComponent},
  {path: 'user/profile', component: UserProfileComponent},

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
