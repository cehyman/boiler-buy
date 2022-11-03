import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-feature-buttons',
  templateUrl: './feature-buttons.component.html',
  styleUrls: ['./feature-buttons.component.css']
})
export class FeatureButtonsComponent implements OnInit {

  private appcomp: AppComponent = new AppComponent();

  curremail:string = ''
  wishlistLink:string = ''
  wishlistID:number = 0

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    //get the wishlist id number from account db
    this.curremail = <string> this.appcomp.getEmail()

    var request = this.http.get<any>('http://localhost:8000/api/accounts/'.concat(this.curremail).concat("/"))
    console.log(this.curremail)
    request.subscribe(data => {
      this.wishlistLink = data['wishlist']
      // console.log("from data " + data.wishlist)
      // console.log("from var " + this.wishlistLink)

      let urlSp = this.wishlistLink.split('/')
      // console.log("from id " + id)
      // console.log(id[id.length - 2])
      this.wishlistID = Number(urlSp[urlSp.length - 2])
      console.log("id: " + this.wishlistID)
    })
  }

  routeUserWishlist() {
    this.router.navigate(['/wishlist/' + this.wishlistID])
  }

  routePurchaseHistory() {
    this.router.navigate(['/profile/purchase-history'])
  }

}
