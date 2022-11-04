import { Component, Input , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    var request = this.http.get('https://boilerbuy-api.azurewebsites.net/api/accounts/')
    let i = 0
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })
  }

  private appcomp: AppComponent = new AppComponent();

  accountUsername:string = '';
  accountPassword:string = '';
  accountEmail:string = '';
  curUsers:any = []

  login() {
    if (this.accountUsername.length == 0 || this.accountPassword.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    let i = 0
    console.log(this.curUsers[0].length)
    var found = false;
    for (i = 0; i < this.curUsers[0].length; i++) {
      console.log(this.accountUsername)
      console.log(this.curUsers[0][i]['username'])
      console.log(this.curUsers[0][i]['email'])
      if (this.accountUsername == this.curUsers[0][i]['username']) {
        if(this.accountPassword != this.curUsers[0][i]['password']) {
          found = false;
        }
        else {
          found = true;
          this.accountEmail = this.curUsers[0][i]['email']
        }
        break;
      }
    }
    if(!found) {
      alert("Incorrect username or password.")
      return;
    }

    this.appcomp.saveUsername(this.accountUsername)
    this.appcomp.savePassword(this.accountPassword)
    this.appcomp.saveEmail(this.accountEmail)
    

    this.router.navigate(['/profile'])
    
  }

}
