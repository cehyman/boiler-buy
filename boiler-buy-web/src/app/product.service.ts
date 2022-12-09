import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location, } from '@angular/common';

import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { FilterSearchInput, ProductList } from './product-types';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  constructor(
    private http: HttpClient, 
    private location: Location,
    private chatService: ChatService
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

  purchaseOne(productID: number, locations: any[]): Observable<any> {
    return this.purchaseMany(productID, 1, locations);
  }

  purchaseMany(productID: number, quantity: number, locations: any[]): Observable<any> {
    this.addProductToViewHistory(productID);
    var body = {
      "username": this.appcomp.getUsername(),
      "productID": productID,
      "quantity": quantity,
      "locations": locations
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

  purchaseManyWithPrice(
    productID: number,
    quantity: number,
    priceDollars: number,
    priceCents: number,
    priceShippingDollars:number,
    priceShippingCents:number): Observable<any> {

    let totalPriceCents = (priceCents * quantity) + priceShippingCents;
    let carry = Math.trunc(totalPriceCents/100);
    totalPriceCents = totalPriceCents % 100;
    let totalPriceDollars = (priceDollars * quantity) + priceShippingDollars + carry;
    var body = {
      "username": this.appcomp.getUsername(),
      "productID": productID,
      "quantity": quantity,
      "totalPriceDollars": totalPriceDollars,
      "totalPriceCents": totalPriceCents,
    }
    var request = this.http.post('api/purchaseHistory/', body);
    return request;
  }
}