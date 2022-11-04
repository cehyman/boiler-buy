import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { FilterSearchInput, ProductList } from './product-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  constructor(private http: HttpClient) {}

  getProductList(): Observable<ProductList> {
    return this.http.get('https://boilerbuy-api.azurewebsites.net/api/products/', {responseType: 'json'}) as Observable<ProductList>;
  }

  filterSearch(params: FilterSearchInput): Observable<ProductList> {
    const url = new URL('https://boilerbuy-api.azurewebsites.net/api/products/');

    if (params.name != null && params.name != '') url.searchParams.set('name', params.name);
    if (params.productType != null) url.searchParams.set('productType', params.productType.toString());
    if (params.brand != null) url.searchParams.set('brand', params.brand.toString());
    if (params.minPrice != null) url.searchParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice != null) url.searchParams.set('maxPrice', params.maxPrice.toString());
    if (params.minSellerRating != null) url.searchParams.set('minSellerRating', params.minSellerRating.toString());
    if (params.maxSellerRating != null) url.searchParams.set('maxSellerRating', params.maxSellerRating.toString());
    if (params.tags != null) url.searchParams.set('tags', params.tags.toString());

    console.log(url.toString());
    
    return this.http.get(url.toString(), {responseType: 'json'}) as Observable<ProductList>;
  }

  purchaseOne(productID: number): Observable<any> {
    return this.purchaseMany(productID, 1);
  }

  purchaseMany(productID: number, quantity: number): Observable<any> {
    var body = {
      "username": this.appcomp.getUsername(),
      "productID": productID,
      "quantity": quantity
    }
    var request = this.http.post('https://boilerbuy-api.azurewebsites.net/api/purchaseHistory/', body);
    return request;
  }

}