import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from '../change-password.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private appcomp: AppComponent = new AppComponent();


  userName:string = ""
  email:string = ""
  oldPassword:string = "";
  newPassword:string = "";
  repeatPassword:string = "";
  data:string = ""
  curUsers:any = []


  constructor (
    private router:Router, 
    private changePasswordService: ChangePasswordService, 
    private http:HttpClient) { }

  ngOnInit(): void {
    if(this.appcomp.getUsername() == null || this.appcomp.getUsername() == "") {
      this.router.navigate(['/login'])
    }
    this.userName = this.appcomp.getUsername() || ""
    var request = this.http.get('http://127.0.0.1:8000/api/accounts/')
    let i = 0
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })
  }

  updatePasswordInfo() {
    console.log(this.userName)
    if (this.userName.length == 0 || this.oldPassword.length == 0 || this.newPassword.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    if (this.oldPassword == this.newPassword) {
      alert("New password should not match old password.")
      return;
    }
    if (this.newPassword != this.repeatPassword) {
      alert("New password should match repeated password.")
      return;
    }
    let i = 0
    console.log(this.curUsers[0].length)
    for (i = 0; i < this.curUsers[0].length; i++) {
      console.log(this.userName)
      console.log(this.curUsers[0][i]['username'])
      console.log(this.email == this.curUsers[0][i]['email'])
      console.log(this.curUsers[0][i]['email'])
      console.log(this.curUsers[0][i]['password'])
      if(this.userName == this.curUsers[0][i]['username']) {
        if(this.oldPassword != this.curUsers[0][i]['password']) {
          alert("Incorrect old password!")
          return;
        }
        this.email = this.curUsers[0][i]['email']
        break;
      }
    }
    this.curUsers[0][i]['password'] = this.newPassword;
    this.appcomp.saveUsername(this.userName);
    this.appcomp.savePassword(this.newPassword);
    this.appcomp.saveEmail(this.email);
    this.changePasswordService.updatePassword(this.newPassword, this.email); 

    this.router.navigate(['/profile'])
  }
}
