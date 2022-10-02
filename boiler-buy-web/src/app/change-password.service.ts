import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  curUsers:any = [];

  updatePassword(userName:string, newPassword:string, email:string) {
    var body = {
      username: userName,
      password: newPassword,
      email: email
    };
    // var accountsRequest = this.http.get('http://localhost:8000/api/v1/accounts/');
    // let i = 0
    // accountsRequest.subscribe((data: any) => {
    //   console.log(data);
    //   this.curUsers.push(data);
    //   console.log(this.curUsers);
    // })

    // console.log(email);
    // console.log("Searching array");
    // console.log(this.curUsers[0][i]['username'])
    // for (i = 0; i < this.curUsers[0].length; i++) {
    //   console.log(this.curUsers[0][i]['username'])
    //   console.log(this.curUsers[0][i]['email'])
    //   if (email == this.curUsers[0][i]['email']) {
    //     alert("Email found!")
    //     this.curUsers[0].splice(i, 1)
    //     break;
    //   }
    // }

    // console.log("New array is");
    // for (i = 0; i < this.curUsers[0].length; i++) {
    //   console.log(this.curUsers[0][i]['username'])
    //   console.log(email)
    //   console.log(this.curUsers[0][i]['email'])

    // }


    // var request = this.http.delete<any>("http://localhost:8000/api/v1/accounts/", body, {observe: 'response'});
    var request = this.http.post<any>("http://localhost:8000/api/v1/accounts/", body, {observe: 'response'});

    request.subscribe((data: any) => {
      console.log(data)
    })
    alert("Password Updated!")
  }

  constructor(private http:HttpClient) { }

}
