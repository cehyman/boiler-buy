import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  accountEmail:String = "";

  reset() {
    // check if email exists 

    // email sent!

    // redirect to special-reset-password
  }

}
