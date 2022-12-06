import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  data:string = ""
  curUsers:any = []
  updatePassword(newPassword:string, email:string) {
        var body = {
          password: newPassword
        };
        var accountURL = "api/accounts/".concat(email).concat("/");
        var patchRequest = this.http.patch<any>(accountURL, body, {observe: 'response'});
    
        patchRequest.subscribe((data: any) => {
          console.log(data)
        })
        alert("Password Updated!")
  }

  constructor(private http:HttpClient) { }
  
}
