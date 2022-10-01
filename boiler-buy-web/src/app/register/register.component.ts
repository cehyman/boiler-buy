import { Component, Input , OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { RegisterService } from '../register.service';
import {Accounts} from "../accounts"

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

  constructor(private registerService:RegisterService) {}
 
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
  }
}
