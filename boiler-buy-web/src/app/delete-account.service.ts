import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountService {

  deleteUser(email:string) {
    var accountURL = " http://127.0.0.1:8000/api/accounts/".concat(email).concat("/");
    return this.http.delete(accountURL)
  }

  constructor(private http:HttpClient) { }
}
