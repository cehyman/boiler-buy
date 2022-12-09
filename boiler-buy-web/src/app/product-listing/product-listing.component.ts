import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import { Product } from '../product-types';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChatService } from '../chat.service';
import { ChatMessageItem } from '../chat-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  @Input() object: Product = {id: 0, name: "", priceDollars: 0, sellerRating: 0, sellerRatingCount: 0} as Product;
  @Input() showButton: boolean = true;

  public globals: Globals = new Globals;
  products:any = []
  locations:any = ["Other"]
  wishlist_id:number = 0
  curremail:string = ''
  curruser:string = ''
  
  private appcomp: AppComponent = new AppComponent();

  halfStar: boolean = false;
  fullStars: Array<boolean>;
  emptyStars: Array<boolean>;

  constructor(private productService: ProductService, private router: Router,
    private http: HttpClient, public dialog: MatDialog, private chatService: ChatService
  ) {
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
    this.curruser = <string> this.appcomp.getUsername()
  }

  viewDetails() {
    // console.log("redirect")
    this.productService.addProductToViewHistory(this.object.id).subscribe(() => {
      console.log("added "+ this.object.id + " to view history");
      this.router.navigate(['/products/' + this.object.id])
    })
    
  }

  openDialog(): void {
    if (this.curruser != 'Username') {
      const dialogRef = this.dialog.open(PurchaseConfirmationDialog, {
        width: '400px',
        data: {
          priceDollars: this.object.priceDollars,
          priceCents: this.object.priceCents,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.productService.addProductToViewHistory(this.object.id).subscribe(() => {
          console.log("added "+ this.object.id + " to view history");
        });
        console.log(result);
        if (result != undefined && result != 0) {
          this.productService.getProductsSellerEmail(this.object.id).subscribe((sellerEmail) => {
            console.log(sellerEmail.sellerEmail)
            console.log(this.object.id)

            //create a chatGroup
            this.chatService.createChatGroup({
              buyer: this.curremail,
              seller: sellerEmail.sellerEmail,
              product: this.object.id,
              quantity: result.numToBuy
            }).subscribe((output) => {
              console.log(output);
            })

            this.chatService.sendMessage({
              senderEmail: this.curremail,
              receiverEmail: sellerEmail.sellerEmail,
              productID: this.object.id,
              message: this.curruser + " is requesting " + result.numToBuy + " items for $"
                + result.askingPriceDollars + "." + ((result.askingPriceCents < 10) ? "0" + result.askingPriceCents : result.askingPriceCents)
                + " each."
            } as ChatMessageItem).subscribe((output) => {
              console.log(output);
              // Redirect to the chat page
              var params = new URLSearchParams();
              params.set('currEmail', this.curremail);
              params.set('otherEmail', sellerEmail.sellerEmail);
              params.set('productID', "" + this.object.id);
              this.router.navigate(
                ['/chat-window'], {queryParams: {
                currEmail: this.curremail,
                otherEmail: sellerEmail.sellerEmail,
                productID: this.object.id
              }})
              console.log(params.toString())
            }, (error) => {
              console.log(error);
            })
          }, (error) => {
            console.log(error);
          })
        }
      });
    }
  }


  // purchase(numToPurchase: number): void {
  //   console.log('buying', this.object.name);
  //   //need to add item to user's purchases
  //   this.productService.purchaseMany(this.object.id, numToPurchase, this.locations).subscribe(
  //     data => {
  //       console.log(data.message);
  //       alert("Purchase Successful!");
  //     },
  //     error => {
  //       console.log('purchase failed:', error.error);
  //       alert("Purchase Failed, try again.");
  //     },
  //     () => {
  //       location.reload();
  //     }
  //   )
  // }

  getLocations() {
    var request = this.http.get('api/products/' + this.object.id, {responseType: 'json'}) as Observable<Product>

    request.subscribe((data:any) => {
      //console.log(data)
      this.locations = data.locations
      console.log(this.locations)
    })
  }
  
  addToWishlist() {
    this.products = JSON.parse(<string> this.appcomp.getWishlistProductArray())
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

      var request = this.http.post<any>("api/wishlist/", formData, {observe: "response"});
      request.subscribe((data:any) => {
        console.log(data)

        alert("Added to wishlist")

        this.getUserWishlist() 
      })
    }
  }

  removeFromWishlist() {
    this.products = JSON.parse(<string> this.appcomp.getWishlistProductArray())
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

      var request = this.http.post<any>("api/wishlist/", formData, {observe: "response"});

      request.subscribe((data:any) => {
        console.log(data)

        alert("Removed from wishlist")
        this.getUserWishlist() 
        
        // force page refresh
        window.location.reload();
      })
    }

  }

  getUserWishlist() {
    var request = this.http.get<any>('api/accounts/'.concat(this.curremail).concat("/"))
    console.log(this.curremail)
    request.subscribe(data => {
      let wishlistLink = data['wishlist']
      let urlSp = wishlistLink.split('/')
      this.wishlist_id = Number(urlSp[urlSp.length - 2])
      console.log("id: " + this.wishlist_id)

      //get the user's wishlist product array
      var request = this.http.get<any>('api/wishlist/' + this.wishlist_id, {observe: "body"})
      request.subscribe(data => {
      console.log(data)
      this.products = data.products

      this.appcomp.saveWishlistProductArray(this.products)
      })
    })
  } 
}

@Component({
  selector: 'purchase-confirmation-dialog',
  templateUrl: 'purchase-confirmation-dialog.html',
})
export class PurchaseConfirmationDialog {
  numToBuy: number = 1;
  locationList = [
    {name:'WALC', value:'WALC', checked:false},
    {name:'Corec', value:'Corec', checked:false},
    {name:'Lawson', value:'Lawson', checked:false},
    {name:'Other', value:'Other', checked:false}
  ]
  askingPriceDollars: number = this.data.priceDollars;
  askingPriceCents: number = this.data.priceCents;

  constructor(
    public dialogRef: MatDialogRef<PurchaseConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  isConfirmShow(): boolean {
    return (
      this.numToBuy > 0 &&
      this.askingPriceDollars >= 0 &&
      this.askingPriceCents >= 0 &&
      this.askingPriceCents < 100
    );
  }
}