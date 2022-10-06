import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from '../app.component';

//global variables
import {Globals} from '../globals'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  curruser:string = ''
  currpass:string = ''
  curremail:string = ''

  constructor(private http: HttpClient) {}
  

  ngOnInit(): void {
    console.log("Starting value of gloabl username is %s", this.globals.username)
    console.log("But value of saved username in session saver is $s",this.appcomp.getUsername())
    this.globals.username = <string> this.appcomp.getUsername()

    if (this.appcomp.getUsername()) {
      this.curruser = <string> this.appcomp.getUsername()
    } else {
      this.curruser = "Username"
    }

    this.currpass = <string> this.appcomp.getPassword()
    this.curremail = <string> this.appcomp.getEmail()
  }

  deleteAccount() {
    //TODO: deletes account should create and use a service file for request
  }



}
