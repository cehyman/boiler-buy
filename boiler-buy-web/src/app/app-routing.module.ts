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
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'create', component: CreateComponent},
  { path: 'products/search', component: ProductSearchComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'edit/:id', component: EditProductComponent},
  { path: 'change-username', component: ChangeUsernameComponent},
  { path: 'sellerReview', component: SellerReviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products/:id', component: ProductDetailsComponent}
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