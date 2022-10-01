import { Component, Input , OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { RegisterService } from '../register.service';
import {Accounts} from "../accounts"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'register.component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit{
  accountUsername:string = '';
  accountPassword:string = '';
  accountEmail:string = '';

  constructor(private http: HttpClient) {}
 
  ngOnInit() {
  }
 
  registerAccount() {
    // this.registerService.addNewAccount(this.account).subscribe(
    //   response => {
    //     alert('User ' + this.account.username + ' has been created!')
    //   },
    //   error => console.log('error', error)
    // );      
    console.log("Register");
    console.log('Username:' + this.accountUsername)
    console.log('Password:' + this.accountPassword)
    console.log('Email:' + this.accountEmail)
    this.http.post('http://localhost:8000/api/v1/register/',
      JSON.stringify({
        username: this.accountUsername,
        password: this.accountPassword,
        email: this.accountEmail,
      })).subscribe(
        data => {
          alert('ok');
        }
      )
  }
}
