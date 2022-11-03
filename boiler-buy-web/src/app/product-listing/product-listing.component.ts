import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import { Product } from '../product-types';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent implements OnInit {
  @Input() object: Product = {id: 0, name: "", priceDollars: 0, sellerRating: 0, sellerRatingCount: 0} as Product;

  public globals: Globals = new Globals;
  products:any = []
  wishlist_id:number = 0
  curremail:string = ''
  curruser:string = ''
  
  private appcomp: AppComponent = new AppComponent();

  halfStar: boolean = false;
  fullStars: Array<boolean>;
  emptyStars: Array<boolean>;

  constructor(private productService: ProductService, private router: Router, private http: HttpClient, public dialog: MatDialog) {
    this.fullStars = new Array();
    this.emptyStars = new Array();
  }

  ngOnInit(): void {
    let starsLeft = 5;
    for(let i = 0; i < Math.floor(this.object.sellerRating); i++) {
      this.fullStars.push(true);
      starsLeft--;
    }
    // console.log('stars left after full stars: ', starsLeft)
    let diff = this.object.sellerRating - Math.floor(this.object.sellerRating);
    if (diff >= 0.5) {
      this.halfStar = true;
      starsLeft--;
    }
    // console.log('stars left after checking half star: ', starsLeft)
    
    for(let i = 0; i < starsLeft; i++) {
      this.emptyStars.push(true);
    }

    this.globals.username = <string> this.appcomp.getUsername()

    if (this.appcomp.getUsername()) {
      this.curruser = <string> this.appcomp.getUsername()
    } else {
      this.curruser = "Username"
    }
    console.log("current username:",this.curruser)
    //get user wishlist id
    this.curremail = <string> this.appcomp.getEmail()

    var request = this.http.get<any>('http://localhost:8000/api/accounts/'.concat(this.curremail).concat("/"))
    console.log(this.curremail)
    request.subscribe(data => {
      let wishlistLink = data['wishlist']
      let urlSp = wishlistLink.split('/')
      this.wishlist_id = Number(urlSp[urlSp.length - 2])
      console.log("id: " + this.wishlist_id)

      //get the user's wishlist product array
      var request = this.http.get<any>('http://localhost:8000/api/wishlist/' + this.wishlist_id, {observe: "body"})
      request.subscribe(data => {
      console.log(data)
      this.products = data.products
      })
    })
  }

  viewDetails() {
    // console.log("redirect")
    console.log(this.object.id)
    this.router.navigate(['/products/' + this.object.id])
  }

  openDialog(): void {
    if (this.curruser != 'Username') {
      const dialogRef = this.dialog.open(PurchaseConfirmationDialog, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result != 0) {
          this.purchase(result);
        }
      });
    }
  }

  purchase(numToPurchase: number): void {
    console.log('buying', this.object.name);
    //need to add item to user's purchases
    this.productService.purchaseMany(this.object.id, numToPurchase).subscribe(
      data => {
        console.log(data.message);
        alert("Purchase Successful!");
      },
      error => {
        console.log('purchase failed:', error.error);
        alert("Purchase Failed, try again.");
      },
      () => {
        location.reload();
      }
    )
  }
  
  addToWishlist() {
    console.log(this.object.id)
    let added = 0

    //check if product is already on list
    let i = 0
    for (i = 0; i < this.products.length; i++) {
      if (this.object.id == this.products[i]) {
        //console.log("Already in wishlist")
        alert("Already added to wishlist.")
        added = 1
      }
    }

    if (added == 0) {
      //add object id to user's wishlist
      var formData = new FormData()
      formData.append("productID", `${this.object.id}`)
      formData.append("username", this.curruser)
      formData.append("request", "add")

      var request = this.http.post<any>("http://localhost:8000/api/wishlist/", formData, {observe: "response"});
      request.subscribe((data:any) => {
        console.log(data)

        alert("Added to wishlist")
      })
    }
  }

  removeFromWishlist() {
    console.log(this.object.id)
    let exists = 0

    //check if product is already on list
    let i = 0
    for (i = 0; i < this.products.length; i++) {
      if (this.object.id == this.products[i]) {
        exists = 1
      }
    }

    if (exists == 0) {
      alert("Not in wishlist")
    }

    if (exists == 1) {
      var formData = new FormData()
      formData.append("productID", `${this.object.id}`)
      formData.append("username", this.curruser)
      formData.append("request", "remove")

      var request = this.http.post<any>("http://localhost:8000/api/wishlist/", formData, {observe: "response"});

      request.subscribe((data:any) => {
        console.log(data)

        alert("Removed from wishlist")
        
        // force page refresh
        window.location.reload();
      })
    }

  }

}

@Component({
  selector: 'purchase-confirmation-dialog',
  templateUrl: 'purchase-confirmation-dialog.html',
})
export class PurchaseConfirmationDialog {
  numToBuy: number = 1;
  constructor(public dialogRef: MatDialogRef<PurchaseConfirmationDialog>) {}
}