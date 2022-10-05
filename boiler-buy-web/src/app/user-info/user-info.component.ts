import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
    console.log("Starting value of gloabl username is %s", this.globals.username)
    console.log("But value of saved username in session saver is $s",this.appcomp.getData())
    this.globals.username = <string> this.appcomp.getData()

    this.curruser = <string> this.appcomp.getData()
  }



}
