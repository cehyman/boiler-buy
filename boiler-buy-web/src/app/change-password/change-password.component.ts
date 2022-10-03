import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from '../change-password.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userName:string = "";
  oldPassword:string = "";
  newPassword:string = "";
  email:string = "";
  curUsers:any = []

<<<<<<< HEAD
  constructor(private changePasswordService: ChangePasswordService, private http:HttpClient) { }
=======
  constructor(private changePasswordService: ChangePasswordService) { }
>>>>>>> ba14c60 (Fixed issue with http)
  // constructor() {}
  ngOnInit(): void {
  }

  updatePasswordInfo(userName:string, email:string, oldPassword:string, newPassword:string) {
<<<<<<< HEAD
    if (userName.length == 0 || oldPassword.length == 0 || newPassword.length == 0 || email.length == 0) {
      alert("All fields must be fieled out.")
      return;
    }
    if (oldPassword == newPassword) {
      alert("Passwords should not match.")
      return;
    }
    if (this.email.length < 11 || email.slice(-11) != "@purdue.edu") {
      alert("Must use a valid Purdue email.")
      return;
    }
    this.changePasswordService.updatePassword(userName, newPassword, email); 
=======
    this.changePasswordService.updatePassword(userName, email, newPassword); 
>>>>>>> ba14c60 (Fixed issue with http)
  }
}
