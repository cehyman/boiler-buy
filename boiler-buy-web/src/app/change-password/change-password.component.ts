import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from '../change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userName?:string;
  oldPassword?:string;
  newPassword?:string;

  constructor(private changePasswordService: ChangePasswordService) { }

  ngOnInit(): void {
  }

  onSelect(userName:string, oldPassword:string, newPassword:string) {
    this.changePasswordService.updatePassword(userName, oldPassword, newPassword);
  }

}
