import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-feature-buttons',
  templateUrl: './feature-buttons.component.html',
  styleUrls: ['./feature-buttons.component.scss']
})
export class FeatureButtonsComponent implements OnInit {

  private appcomp: AppComponent = new AppComponent();

  curremail:string = ''
  wishlistID:number = 0
  shopID:number = 0

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    //get the wishlist id number from account db
    this.curremail = <string> this.appcomp.getEmail()

    var request = this.http.get<any>('api/accounts/'.concat(this.curremail).concat("/"))
    console.log(this.curremail)
    request.subscribe(data => {
      console.log(data)
      let wishlistLink = data['wishlist']
      let shopLink = data['shop']

      let wishUrl = wishlistLink.split('/')
      let shopUrl = shopLink.split('/')

      this.wishlistID = Number(wishUrl[wishUrl.length-2])
      this.shopID = Number(shopUrl[shopUrl.length-2])
      console.log("id: " + this.wishlistID)
      console.log("shopid: " + this.shopID)
    })
  }

  routeUserWishlist() {
    this.router.navigate(['/wishlist/' + this.wishlistID])
  }

  routePurchaseHistory() {
    this.router.navigate(['/profile/purchase-history'])
  }

  routeUserShop() {
    this.router.navigate(['/shop/' + this.shopID])
  }
}
