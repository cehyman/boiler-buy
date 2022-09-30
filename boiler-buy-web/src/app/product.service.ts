import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ProductList } from './product-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductList(): Observable<ProductList> {
    return this.http.get('http://localhost:8000/api/v1/products/', {responseType: 'json'}) as Observable<ProductList>;
  }
}