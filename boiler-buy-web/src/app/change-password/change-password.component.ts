import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from '../change-password.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  

  userName:string = "";
  oldPassword:string = "";
  newPassword:string = "";
  email:string = "";
  data:string = ""

  constructor(private changePasswordService: ChangePasswordService, private http:HttpClient) { }
  // constructor() {}
  ngOnInit(): void {
    var request = this.http.get('http://localhost:8000/api/v1/accounts/spabbise@purdue.edu/')
    request.subscribe((data: any) => {
      // this.curUsers.push(data);
      this.data = data.password;
      console.log(this.data)
      // console.log(oldPassword)
    })
    // let i = 0
    // request.subscribe((data: any) => {
    //   this.curUsers.push(data);
    // })
  }

  updatePasswordInfo(userName:string, email:string, oldPassword:string, newPassword:string) {
    
    

    if(this.data != oldPassword) {
      alert("Incorrect old password!")
     
    }
    else {
      if (userName.length == 0 || oldPassword.length == 0 || newPassword.length == 0 || email.length == 0) {
        alert("All fields must be filled out.")
        return;
      }
      if (oldPassword == newPassword) {
        alert("Passwords should not match.")
        return;
      }
      if (this.email.length < 11 || email.slice(-11) != "@purdue.edu") {
        alert("Must use a valid Purdue email.")
        return;
      }
      this.changePasswordService.updatePassword(userName, oldPassword, newPassword, email); 
    }    
  }
}
