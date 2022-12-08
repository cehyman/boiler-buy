import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

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

  constructor(
    private http: HttpClient, 
    private location: Location,
    private locationStrategy: LocationStrategy,
  ) {}

  getProductList(): Observable<ProductList> {
    return this.http.get('api/products/', {responseType: 'json'}) as Observable<ProductList>;
  }

  filterSearch(params: FilterSearchInput): Observable<ProductList> {
    // We have to fetch the origin from the window since URL objects need to 
    // have a domain as part of the URL. We use the window object to get this
    // so that the URL works regardless or where the frontend is hosted
    let urlBase = window.location.origin + '/api/products/';
    console.log(`Constructing search request to ${urlBase}`);
    let url = new URL(urlBase); 
    
    if (params.name != null && params.name != '') 
      url.searchParams.set('name', params.name);
    if (params.productType != null) 
      url.searchParams.set('productType', params.productType.toString());
    if (params.brand != null) 
      url.searchParams.set('brand', params.brand.toString());
    if (params.minPrice != null) 
      url.searchParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice != null) 
      url.searchParams.set('maxPrice', params.maxPrice.toString());
    if (params.minSellerRating != null) 
      url.searchParams.set('minSellerRating', params.minSellerRating.toString());
    if (params.maxSellerRating != null) 
      url.searchParams.set('maxSellerRating', params.maxSellerRating.toString());
    if (params.tags != null) 
      url.searchParams.set('tags', params.tags.toString());

    console.log(url.toString());
    
    return this.http.get(url.toString(), {responseType: 'json'}) as Observable<ProductList>;
  }

  purchaseOne(productID: number): Observable<any> {
    return this.purchaseMany(productID, 1);
  }

  purchaseMany(productID: number, quantity: number): Observable<any> {
    this.addProductToViewHistory(productID);
    var body = {
      "username": this.appcomp.getUsername(),
      "productID": productID,
      "quantity": quantity
    }
    var request = this.http.post('api/purchaseHistory/', body);
    return request;
  }

  addProductToViewHistory(productID: number): Observable<any> {
    var body = {
      "username": this.appcomp.getUsername(),
      "productID": productID
    }
    var request = this.http.post('api/viewHistory/', body);
    return request;
  }

}