import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChangePasswordService } from '../change-password.service';

@Component({
  selector: 'app-special-reset-password',
  templateUrl: './special-reset-password.component.html',
  styleUrls: ['./special-reset-password.component.css']
})
export class SpecialResetPasswordComponent implements OnInit {
  private appcomp: AppComponent = new AppComponent();


  userName:string = ""
  email:string = ""
  newPassword:string = "";
  repeatPassword:string = "";
  data:string = ""
  curUsers:any = []


  constructor (
    private router:Router, 
    private changePasswordService: ChangePasswordService, 
    private http:HttpClient) { }

  ngOnInit(): void {
    this.email = this.appcomp.getEmail() || ""
    console.log("The email is ")
    var request = this.http.get('api/accounts/')
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })
  }

  updatePasswordInfo() {
    console.log(this.email)
    if (this.userName.length == 0 || this.newPassword.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    if (this.newPassword != this.repeatPassword) {
      alert("New password should match repeated password.")
      return;
    }
    let i = 0
    console.log(this.curUsers[0].length)
    // for (i = 0; i < this.curUsers[0].length; i++) {
    //   console.log(this.userName)
    //   console.log(this.curUsers[0][i]['username'])
    //   console.log(this.email == this.curUsers[0][i]['email'])
    //   console.log(this.curUsers[0][i]['email'])
    //   console.log(this.curUsers[0][i]['password'])
    //   if(this.userName == this.curUsers[0][i]['username']) {
    //     this.email = this.curUsers[0][i]['email']
    //     break;
    //   }
    // }
    // this.curUsers[0][i]['password'] = this.newPassword;
    // this.appcomp.saveUsername(this.userName);
    this.appcomp.savePassword(this.newPassword);
    this.appcomp.saveEmail(this.email);
    this.changePasswordService.updatePassword(this.newPassword, this.email); 

    this.router.navigate(['/login'])
  }
}
