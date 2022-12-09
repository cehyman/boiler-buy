import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChangePasswordService } from '../change-password.service';

@Component({
  selector: 'app-special-reset-password',
  templateUrl: './special-reset-password.component.html',
  styleUrls: ['./special-reset-password.component.scss']
})
export class SpecialResetPasswordComponent implements OnInit {
  private appcomp: AppComponent = new AppComponent();


  userName:string = ""
  email:string = ""
  newPassword:string = "";
  repeatPassword:string = "";
  data:string = ""
  curUsers:any = []


  constructor (
    private router:Router,
    private activatedRoute: ActivatedRoute, 
    private changePasswordService: ChangePasswordService, 
    private http:HttpClient) { }

    private id: string = ""

  ngOnInit(): void {
    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.id = urlStr.split(',')[1];
    console.log(this.id)
    this.email = this.id
    console.log("The email is ")
    var request = this.http.get('api/accounts/')
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })
  }

  updatePasswordInfo() {
    console.log(this.email)
    if (this.repeatPassword.length == 0 || this.newPassword.length == 0) {
      alert("All fields must be filled out.")
      return;
    }
    if (this.newPassword != this.repeatPassword) {
      alert("New password should match repeated password.")
      return;
    }
    let i = 0
    console.log(this.curUsers[0].length)
    this.appcomp.savePassword(this.newPassword);
    this.appcomp.saveEmail(this.email);
    this.changePasswordService.updatePassword(this.newPassword, this.email); 

    this.router.navigate(['/login'])
  }
}
