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
import { GeneralChatComponent } from './general-chat/general-chat.component';
import { RetrieveUsernameComponent } from './retrieve-username/retrieve-username.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { LoginGuard } from './AuthGuards/login.guard';
import { VerifiedGuard } from './AuthGuards/verified.guard';
import { NotVerifiedComponent } from './not-verified/not-verified.component';
import { VerifyEmailGuard } from './AuthGuards/verify-email.guard';
import { ChatOverviewComponent } from './chat-overview/chat-overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'verify', redirectTo: 'login'},
  { path: 'verify/:id', component: VerifyAccountComponent,                  canActivate: [LoginGuard, VerifyEmailGuard]},
  { path: 'not-verified', component: NotVerifiedComponent,                  canActivate: [LoginGuard]},
  { path: 'create', component: CreateComponent,                             canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'products/search', component: ProductSearchComponent,             canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'profile', component: ProfileComponent,                           canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'change-password', component: ChangePasswordComponent,            canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'edit/:id', component: EditProductComponent,                      canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'change-username', component: ChangeUsernameComponent,            canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'sellerReview/:id', component: SellerReviewComponent,             canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'products/:id', component: ProductDetailsComponent,               canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'profile/purchase-history', component: PurchaseHistoryComponent,  canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'wishlist/:id', component: UserWishlistComponent,                 canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'shop/:id', component: UserShopComponent,                         canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'change-profile-pic', component: ChangeProfilePicComponent,       canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'shop/:id/history', component: ShopHistoryViewComponent,          canActivate: [LoginGuard, VerifiedGuard]}, 
  { path: 'chat/:id', component: GeneralChatComponent,                      canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'chat', component: ChatOverviewComponent,                         canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'retrieve-username', component: RetrieveUsernameComponent,        canActivate: [LoginGuard, VerifiedGuard]},
  { path: 'chat-window', component: GeneralChatComponent,                         canActivate: [LoginGuard, VerifiedGuard]},
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