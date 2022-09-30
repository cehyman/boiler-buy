import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListingComponent } from './create-listing/create-listing.component';

const routes: Routes = [
  {path: 'create', component: CreateListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
