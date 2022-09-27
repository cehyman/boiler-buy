import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

import { ExampleComponent } from './example/example.component';
import { ProductSearchComponent } from './product-search/product-search.component';

const routes: Routes = [
  { path: 'example', component: ExampleComponent },
  { path: 'product-search', component: ProductSearchComponent}
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
