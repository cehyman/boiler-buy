import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from '../change-password.service';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userName:string = "";
  oldPassword:string = "";
  newPassword:string = "";
  repeatPassword:string = "";
  email:string = "";
  data:string = ""
  curUsers:any = []

  private appcomp: AppComponent = new AppComponent();
  constructor(private changePasswordService: ChangePasswordService, private http:HttpClient) { }

  ngOnInit(): void {
    var request = this.http.get('http://localhost:8000/api/accounts/')
    let i = 0
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })
  }

  updatePasswordInfo(userName:string, email:string, oldPassword:string, newPassword:string, repeatPassword:string) {
    if (userName.length == 0 || oldPassword.length == 0 || newPassword.length == 0 || email.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    if (oldPassword == newPassword) {
      alert("New password should not match old password.")
      return;
    }
    if (newPassword != repeatPassword) {
      alert("New password should match repeated password.")
      return;
    }
    if (this.email.length < 11 || email.slice(-11) != "@purdue.edu") {
      alert("Must use a valid Purdue email.")
      return;
    }
    let i = 0
    console.log(this.curUsers[0].length)
    for (i = 0; i < this.curUsers[0].length; i++) {
      console.log(this.userName)
      console.log(this.curUsers[0][i]['username'])
      console.log(email == this.curUsers[0][i]['email'])
      console.log(this.curUsers[0][i]['email'])
      console.log(this.curUsers[0][i]['password'])
      if(email == this.curUsers[0][i]['email']) {
        if(oldPassword != this.curUsers[0][i]['password']) {
          alert("Incorrect old password!")
          return;
        }
        break;
      }
    }
    this.curUsers[0][i]['password'] = newPassword;
    this.appcomp.savePassword(newPassword);
    this.changePasswordService.updatePassword(userName, oldPassword, newPassword, email); 
  }
}
