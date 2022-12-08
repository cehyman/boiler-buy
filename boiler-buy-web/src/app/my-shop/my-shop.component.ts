import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { PictureUploadComponent } from '../picture-upload/picture-upload.component';

@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrls: ['./my-shop.component.css']
})
export class MyShopComponent implements OnInit {
  @ViewChild('picUpload') picUpload !: PictureUploadComponent;

  private appcomp: AppComponent = new AppComponent();
  
  curremail: string = '';
  shopId: number = 0;

  description: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch the shop id using the user's account.
    this.curremail = <string> this.appcomp.getEmail()
    let request = this.http.get(`/api/accounts/${this.curremail}/`, {observe: "body"});
    request.subscribe((result: any) => {
      this.shopId = result.shop.split('/')[5];
      
      // Now that we know the id of the shop, we can request the description of the 
      // shop
      let subRequest = this.http.get(`/api/shops/${this.shopId}`, {observe: "body"});
      subRequest.subscribe((result: any) => {
        this.description = result.description;
        this.picUpload.loadFromDatabase(result.image);
      });
    }); 
  }

  submit() {
    let body = {
      "description": this.description
    };

    let request = this.http.patch(`/api/shops/${this.shopId}/`, body, {observe: "body"});
    request.subscribe((result: any) => {
      console.log("Description Updated");
    });

    let files: File[] = this.picUpload.getNewFiles();
    if(files.length > 0) {
      let formData = new FormData();
      formData.append('image', files[0]);

      let request2 = this.http.patch(`/api/shops/${this.shopId}/setImage/`, formData, {observe: "response"});
      request2.subscribe((result: any) => {
        console.log("Image sent");
      });
    }
    files = this.picUpload.getExistingFilesToRemove();
    if(files.length > 0) {
      let request2 = this.http.patch(`/api/shops/${this.shopId}/clearImage/`, {}, {observe: "response"});
      request2.subscribe((result: any) => {
        console.log("Image sent");
      })
    }
  }

}
