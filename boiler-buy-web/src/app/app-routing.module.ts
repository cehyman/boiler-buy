import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { SellerReviewComponent } from './seller-review/seller-review.component';
import { LoginComponent } from './login/login.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserShopComponent } from './user-shop/user-shop.component';
import { ChangeProfilePicComponent } from './change-profile-pic/change-profile-pic.component';
import { ShopHistoryViewComponent } from './shop-history-view/shop-history-view.component';
import { RetrieveUsernameComponent } from './retrieve-username/retrieve-username.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { LoginGuard } from './AuthGuards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create', component: CreateComponent,                             canActivate: [LoginGuard]},
  { path: 'products/search', component: ProductSearchComponent,             canActivate: [LoginGuard]},
  { path: 'profile', component: ProfileComponent,                           canActivate: [LoginGuard]},
  { path: 'change-password', component: ChangePasswordComponent,            canActivate: [LoginGuard]},
  { path: 'edit/:id', component: EditProductComponent,                      canActivate: [LoginGuard]},
  { path: 'change-username', component: ChangeUsernameComponent,            canActivate: [LoginGuard]},
  { path: 'sellerReview/:id', component: SellerReviewComponent,             canActivate: [LoginGuard]},
  { path: 'products/:id', component: ProductDetailsComponent,               canActivate: [LoginGuard]},
  { path: 'profile/purchase-history', component: PurchaseHistoryComponent,  canActivate: [LoginGuard]},
  { path: 'wishlist/:id', component: UserWishlistComponent,                 canActivate: [LoginGuard]},
  { path: 'shop/:id', component: UserShopComponent,                         canActivate: [LoginGuard]},
  { path: 'change-profile-pic', component: ChangeProfilePicComponent,       canActivate: [LoginGuard]},
  { path: 'shop/:id/history', component: ShopHistoryViewComponent,          canActivate: [LoginGuard]},
  { path: 'retrieve-username', component: RetrieveUsernameComponent,        canActivate: [LoginGuard]},
  { path: 'verify/account/:id', component: VerifyAccountComponent,          canActivate: [LoginGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }