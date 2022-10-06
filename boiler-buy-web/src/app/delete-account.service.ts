import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountService {

  DeleteAccountService(email:string) {
    
  }

  constructor(private httpClient:HttpClient) { }
}
