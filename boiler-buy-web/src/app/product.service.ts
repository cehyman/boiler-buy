import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { FilterSearchInput, ProductList } from './product-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductList(): Observable<ProductList> {
    return this.http.get('http://localhost:8000/api/products/', {responseType: 'json'}) as Observable<ProductList>;
  }

  filterSearch(params: FilterSearchInput): Observable<ProductList> {
    const url = new URL('http://localhost:8000/api/products/');

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

}