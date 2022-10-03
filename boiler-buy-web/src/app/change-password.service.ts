import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  updatePassword(userName:string, newPassword:string, email:string) {
    var body = {
      username: userName,
      password: newPassword,
      email: email
    };

    var request = this.http.post<any>("http://localhost:8000/api/v1/accounts/", body, {observe: 'response'});
    request.subscribe((data: any) => {
      console.log(data)
    })
    alert("Password Updated!")
  }

  constructor(private http:HttpClient) { }
}
