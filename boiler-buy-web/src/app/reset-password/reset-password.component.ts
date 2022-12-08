import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    var request = this.http.get('api/accounts/')
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })
  }

  private appcomp: AppComponent = new AppComponent();
  accountEmail:string = "";
  curUsers:any = []

  reset() {
    if (this.accountEmail.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    let i = 0
    console.log(this.curUsers[0].length)
    var found = false;
    for (i = 0; i < this.curUsers[0].length; i++) {
      console.log(this.accountEmail)
      console.log(this.curUsers[0][i]['email'])
      if (this.accountEmail == this.curUsers[0][i]['email']) {
        found = true;
        this.accountEmail = this.curUsers[0][i]['email']
        break;
      }
    }
    if(!found) {
      alert("This email does not have a boiler buy account associated with it!")
      return;
    }
    let request = this.http.get(
      `api/accounts/${this.accountEmail}/sendResetPassword/`,
      {observe: 'response'}
    );
    request.subscribe((response: any) => {
      console.log(response)
    });
    alert("An email to reset your password has been sent!")
    this.appcomp.saveEmail(this.accountEmail)
    this.router.navigate(['/login'])
  }

}
