import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  data:string = ""

  updatePassword(userName:string, oldPassword:string, newPassword:string, email:string) {

    var request = this.http.get('http://localhost:8000/api/v1/accounts/'.concat(email).concat("/"))
    request.subscribe((data: any) => {
      this.data = data.password;
      
    })
    console.log(this.data)
    console.log(oldPassword)
    if(this.data != oldPassword) {
      alert("Incorrect old password!")
      return;
    }
    else {
      var body = {
        password: newPassword
      };
      var accountURL = "http://localhost:8000/api/v1/accounts/".concat(email).concat("/");
      var patchRequest = this.http.patch<any>(accountURL, body, {observe: 'response'});
  
      patchRequest.subscribe((data: any) => {
        console.log(data)
      })
      alert("Password Updated!")
    }
  }

  constructor(private http:HttpClient) { }
}
