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
    //TODO: write api for this somewhere?
    return this.http.get('http://boiler-buy.azurewebsites.net/api/v1/') as Observable<ProductList>;
  }
}