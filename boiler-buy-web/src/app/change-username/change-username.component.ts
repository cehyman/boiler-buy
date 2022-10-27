import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent implements OnInit {

  private appcomp: AppComponent = new AppComponent();


  oldUsername:string = ""
  email:string = ""
  email2:string = ""
  newUsername:string = ""
  // data:string = ""
  curUsers:any = []


  constructor (
    private router:Router,  
    private http:HttpClient) { }

  ngOnInit(): void {
    // if(this.appcomp.getUsername() == null || this.appcomp.getUsername() == "") {
    //   console.log("here")
    //   this.router.navigate(['/login'])
    // }
    // this.oldUsername = this.appcomp.getUsername() || ""
    // Hardcoded for now
    this.oldUsername = "pog"
    var request = this.http.get('http://localhost:8000/api/accounts/')
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })
  }

  changeUsername() {
    console.log(this.oldUsername)
    console.log(this.newUsername)
    console.log(this.email)
    var match = true
    var unique = true
    if (this.newUsername.length == 0 || this.email.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    let i = 0
    // console.log(this.curUsers[0].length)
    for (i = 0; i < this.curUsers[0].length; i++) {
      // console.log(this.curUsers[0][i]['username'])
      // console.log(this.curUsers[0][i]['email'])
      if(this.oldUsername == this.curUsers[0][i]['username']) {
        console.log("Found username")
        console.log(this.curUsers[0][i]['username'])
        if (this.email != this.curUsers[0][i]['email']) {
          alert("Email does not match with account.")
          this.email2 = ""
          match = false
          return
        } else {
          console.log("Email Matches")
          this.email2 = this.curUsers[0][i]['email']
          for (let j = 0; j < this.curUsers[0].length; j++) {
            console.log(this.newUsername)
            console.log(this.curUsers[0][j]['username'])
            if (this.newUsername == this.curUsers[0][j]['username']) {
              unique = false
              alert("Username is taken.")
              break
            }
          }
        }
        break;
      }
    }
    console.log(match)
    console.log(unique)
    if (match && unique) {
        var body = {
          username: this.newUsername
        };
        console.log(this.email)
        var accountURL = "http://localhost:8000/api/accounts/".concat(this.email).concat("/");
        console.log(accountURL)
        var patchRequest = this.http.patch<any>(accountURL, body, {observe: 'response'});
    
        patchRequest.subscribe((data: any) => {
          console.log(data)
        })
        alert("Changed username")
    }
    // if (match) {
      // var body = {
      //   username: this.newUsername
      // };
      // var accountURL = "http://localhost:8000/api/accounts/".concat(email).concat("/");
      // var patchRequest = this.http.patch<any>(accountURL, body, {observe: 'response'});
  
      // patchRequest.subscribe((data: any) => {
      //   console.log(data)
      // })
    // }
    // this.curUsers[0][i]['password'] = this.newPassword;
    // this.appcomp.saveUsername(this.userName);
    // this.appcomp.savePassword(this.newPassword);
    // this.appcomp.saveEmail(this.email);
    // this.changePasswordService.updatePassword(this.newPassword, this.email);

    // this.router.navigate(['/profile'])
  }

}
