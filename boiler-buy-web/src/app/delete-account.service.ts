import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountService {

  deleteUser(email:string) {
    var accountURL = "api/accounts/".concat(email).concat("/");
    return this.http.delete(accountURL)
  }

  constructor(private http:HttpClient) { }
}
