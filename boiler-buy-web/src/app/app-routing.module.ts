import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'products/search', component: ProductSearchComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent }
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