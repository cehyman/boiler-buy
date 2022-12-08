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
    return this.http.get('api/products/', {responseType: 'json'}) as Observable<ProductList>;
  }

  filterSearch(params: FilterSearchInput): Observable<ProductList> {
    const urlParams = new URLSearchParams();

    if (params.name != null && params.name != '') urlParams.set('name', params.name);
    if (params.productType != null) urlParams.set('productType', params.productType.toString());
    if (params.brand != null) urlParams.set('brand', params.brand.toString());
    if (params.minPrice != null) urlParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice != null) urlParams.set('maxPrice', params.maxPrice.toString());
    if (params.minSellerRating != null) urlParams.set('minSellerRating', params.minSellerRating.toString());
    if (params.maxSellerRating != null) urlParams.set('maxSellerRating', params.maxSellerRating.toString());
    if (params.tags != null) urlParams.set('tags', params.tags.toString());

    console.log(urlParams.toString());
    
    return this.http.get('api/products/?' + urlParams.toString(), {responseType: 'json'}) as Observable<ProductList>;
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

  getProductsSellerEmail(productID: number): Observable<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('productID', "" + productID);

    return this.http.get("api/sellerProduct/?" + urlParams.toString(), {responseType: 'json'}) as Observable<any>;
  }

  getProductFromID(id: number): Observable<any> {
    return this.http.get('http://localhost:8000/api/products/' + id, {observe: "body"});
  }
}