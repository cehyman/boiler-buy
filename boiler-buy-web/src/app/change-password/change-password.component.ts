import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userName?:string;
  oldPassword?:string;
  newPassword?:string;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(userName:string, oldPassword:string, newPassword:string) {
    
  }

}
