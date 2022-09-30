import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  updatePassword(userName:string, oldPassword:string, newPassword:string) {
    return this.http.post('http://localhost:8000/api/v1/updatePassword')
  }

  // getProductList(): Observable<ProductList> {
  //   return this.http.get('http://localhost:8000/api/v1/products/', {responseType: 'json'}) as Observable<ProductList>;
  // }

  constructor(private http:HttpClient) { }
}
