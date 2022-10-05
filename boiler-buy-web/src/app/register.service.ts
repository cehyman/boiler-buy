import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
// import {Accounts} from './accounts'

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: HttpClient) {}

  // addNewAccount(account): Observable<any> {
  //   return this.http.post('http://localhost:8000/api/v1/register/', account)
  // }
}