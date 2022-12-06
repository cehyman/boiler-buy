import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { PictureUploadComponent } from '../picture-upload/picture-upload.component';

@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.css']
})
export class ChangeProfilePicComponent implements OnInit {

  private appcomp: AppComponent = new AppComponent();

  curruser:string = ''
  currpass:string = ''
  curremail:string = ''

  @ViewChild('picUpload') picUpload !: PictureUploadComponent;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.curruser = <string> this.appcomp.getUsername()
    this.curremail = <string> this.appcomp.getEmail()
  }

  submit() {
    //picUpload functions are op for product images so all return arrays
    var files: File[] = this.picUpload.getNewFiles()

    if (files.length == 0) {
      alert("No image uploaded.")
    } else {
      var formData = new FormData()

      // formData.append("email", this.curremail);

      //should only be one or none
      for (var i = 0; i < files.length; i++) {
        console.log("found an image");
        var file: File = files[i];
        formData.append("image", file);
      }

      //patch request
      var request = this.http.patch<any>(`/api/accounts/${this.curremail}/addImages/`, formData, {observe: "response"});
      // var request = this.http.patch<any>(`/api/accounts/addImages/`, formData, {observe: "response"});

      request.subscribe((data: any) => {
        console.log(data)
        console.log("Sent image")

        this.router.navigate(['/profile'])
      })
    }
  }

}
