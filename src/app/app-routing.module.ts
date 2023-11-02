import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "seller-auth",
    component: SellerAuthComponent
  },
  {
    path: "seller-home",
    component: SellerHomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "seller-add-product",
    component: SellerAddProductComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "seller-update-product/:id",
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "search/:query",
    component: SearchComponent,
    // canActivate: [AuthGuardGuard]
  },
  {
    path: "product/:id",
    component: ProductDetailsComponent,
    // canActivate: [AuthGuardGuard]
  },
  {
    path: "user-auth",
    component: UserAuthComponent
  },
  {
    path: "cart-page",
    component: CartPageComponent,
    // canActivate: [AuthGuardGuard]
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "my-orders",
    component: MyOrderComponent
  },
  {
    path: "**",
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
