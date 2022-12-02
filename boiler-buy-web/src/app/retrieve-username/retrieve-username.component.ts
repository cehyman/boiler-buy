import { Component, Input , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

import {Globals} from '../globals'

@Component({
  selector: 'app-retrieve-username',
  templateUrl: './retrieve-username.component.html',
  styleUrls: ['./retrieve-username.component.css']
})
export class RetrieveUsernameComponent implements OnInit {
  curUsers:any = []
  accountPassword:string = '';
  accountEmail:string = '';

  private globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    var request = this.http.get('api/accounts/')
    let i = 0
    request.subscribe((data: any) => {
      // console.log(data)
      this.curUsers.push(data);
    })
  }

  verifyAndRetrieve() {
    // console.log(this.curUsers)
    if (this.accountEmail.length == 0 || this.accountPassword.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    var emailFound = false
    var passCorrect = false
    var tempUsername = ""
    for (let i = 0; i < this.curUsers[0].length; i++) {
      if (this.accountEmail == this.curUsers[0][i]['email']) {
        console.log("Email found!")
        console.log(this.curUsers[0][i]['email'])
        emailFound = true
        if (this.accountPassword == this.curUsers[0][i]['password']) {
          console.log("Correct password")
          passCorrect = true
          tempUsername = this.curUsers[0][i]['username']
        }
        break;
      }
    }
    if (!emailFound) {
      console.log("Invalid Email")
    } else if (emailFound && !passCorrect) {
      console.log("Incorrect password!")
    } else {
      console.log("Email Sent")
      //Email Logic
      console.log(tempUsername)
      console.log(this.accountEmail)
      var body = {
        username: tempUsername,
        email: this.accountEmail
      };
  
      var request = this.http.post<any>("api/retrieveUsername/", body, {observe: 'response'});
  
      request.subscribe((data: any) => {
        console.log(data)
      })
    }
  }

}
