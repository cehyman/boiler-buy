import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  data:string = ""

  updatePassword(userName:string, oldPassword:string, newPassword:string, email:string) {

    // var request = this.http.get('http://localhost:8000/api/v1/accounts/'.concat(email).concat("/"))
    // let i = 0
    // request.subscribe((data: any) => {
    //   // this.curUsers.push(data);
    //   this.data = data.password;
      
    // })
    // console.log(this.data)
    // console.log(oldPassword)
    // if(this.data != oldPassword) {
    //   alert("Incorrect old password!")
    //   return;
    // }
    // var holder:any[] = this.curUsers[0]
    // console.log(this.curUsers)
    // console.log(holder)

    // for (i = 0; i < holder.length; i++) {
    //   // console.log(this.accountUsername)
    //   // console.log(this.curUsers[0][i]['username'])
    //   // console.log(this.accountEmail)
    //   // console.log(this.curUsers[0][i]['email'])
    //   if (userName != holder[i]['username']) {
    //     if(holder[i]['password'] != oldPassword) {
    //       alert("Incorrect old password!")
    //       return;
    //     }
    //     break;
    //   } 
    // }
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

  constructor(private http:HttpClient) { }

}
