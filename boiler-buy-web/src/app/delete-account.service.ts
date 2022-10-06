import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountService {
  //URL:string = "https://localhost:8000/api/v1/accounts/"

  deleteUser(email:string) {
    var accountURL = "http://localhost:8000/api/v1/accounts/".concat(email).concat("/");
    return this.http.delete(accountURL)
  }

  constructor(private http:HttpClient) { }
}
