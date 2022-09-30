import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {Accounts} from './accounts'

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: HttpClient) {}

  addAccount(account:Accounts): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(account);
    console.log(body)
    return this.http.post('http://localhost:8000/api/v1/register/', body, {'headers':headers})
  }
}