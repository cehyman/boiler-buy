import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { PictureCarouselComponent } from '../picture-carousel/picture-carousel.component';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseConfirmationDialog } from '../product-listing/product-listing.component';
import { ChatService } from '../chat.service';
import { ChatMessageItem } from '../chat-types';
import { locationInterface } from '../product-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  name: string = '';
  price: string = '';
  shipPrice: string = '';
  description: string = '';
  stock: number = 1;
  canMeet: boolean = true;
  canShip: boolean = false;
  type: string = '';
  brand: string = '';
  id: number = -1;
  temp: any = []
  locationList: locationInterface[] = []
  locationNameList: string[] = []
  tagsTemp: string[] = []
  tags: string[] = []
  userTags: string[] = []

  curruser: string = ''

  private appcomp: AppComponent = new AppComponent();


  @ViewChild('carousel') carousel !: PictureCarouselComponent;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private productService: ProductService,
    public dialog: MatDialog, private chatService: ChatService,) {

  }

  ngOnInit(): void {
    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.id = Number(urlStr.split(',')[1]);
    if(isNaN(this.id)) {
      alert(`Invalid URL "${urlStr}": "${this.id}"`);
      return;
    }
    console.log(this.id)
    if (this.appcomp.getEmail()) {
      this.curruser = <string> this.appcomp.getEmail()
    } else {
      this.curruser = "Email"
    }
    var request = this.http.get('http://localhost:8000/api/products/' + this.id, {observe: "body"})
    let i = 0
    request.subscribe((data: any) => {
      console.log(data)
      this.name = data['name'];
      if (data["priceCents"] < 10) {
        var temp = "0" + data["priceCents"]
      } else {
        temp = data["priceCents"]
      }
      this.price = data['priceDollars'] + "." + temp;
      if (data["shippingCents"] < 10) {
        var temp = "0" + data["shippingCents"]
      } else {
        temp = data["shippingCents"]
      }
      this.shipPrice = data['shippingDollars'] + "." + temp;
      this.description = data['description'];
      this.stock = data['stockCount'];
      this.canMeet = data['canMeet'];
      this.canShip = data['canShip'];
      this.type = data['productType'];
      this.brand = data['brand'];
      this.tagsTemp = data['tags']
      for (let i = 0; i < this.tagsTemp.length; i++) {
        if (this.tagsTemp[i] == "null") {
          this.tagsTemp.splice(i, 1)
          break;
        }
      }
      this.tags = this.tagsTemp

      this.temp = data['locations'];
      //console.log(this.temp)

      for (var i = 0; i < this.temp.length; i++) {
        //console.log(this.temp[i])
        let loc = {location: this.temp[i], value: this.temp[i], checked:false}
        this.locationList.push(loc)
      }
      //console.log(data['locations'])
      console.log(this.locationList)
    });
    this.loadImages();
  }

  loadImages() {
    let request = this.http.get<any>(`api/products/${this.id}/retrieveImages`, {observe: "body"});
    request.subscribe((data: any) => {
      this.carousel.addUrls(data);
    });
  }

  // getUserTagList() {
  //   let request = this.http.get<any>('http://localhost:8000/api/accounts/'+this.curruser+'/', {observe: "body"});
  //   request.subscribe((data: any) => {
  //     console.log(data)
  //     this.userTags = data["savedTags"]
  //   });
  // }


  openDialog(): void {

    var temp2 = this.locationList.filter(location => location.checked).map(location => location.value)
    // for (var i = 0; i < temp2.length; i++) {
    //   //formData.append("locations", temp2[i])
    //   let t = temp2[i]
    // }

    if (this.curruser != 'Username') {
      const dialogRef = this.dialog.open(PurchaseConfirmationDialog, {
        width: '400px',
        data: {
          priceDollars: this.price.substring(0, this.price.indexOf('.')),
          priceCents: "" + (+this.price.substring(this.price.indexOf('.')+1, this.price.length)),
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.productService.addProductToViewHistory(this.id).subscribe(() => {
          console.log("added "+ this.id + " to view history");
        });
        console.log(result);
        if (result != undefined && result != 0) {
          this.productService.getProductsSellerEmail(this.id).subscribe((sellerEmail) => {
            console.log(sellerEmail.sellerEmail)
            console.log(this.id)

            //create a chatGroup
            this.chatService.createChatGroup({
              currEmail: this.curruser,
              otherEmail: sellerEmail.sellerEmail,
              productID: this.id,
            }).subscribe((output) => {
              console.log(output);
            })

            this.chatService.sendMessage({
              senderEmail: this.curruser,
              receiverEmail: sellerEmail.sellerEmail,
              productID: this.id,
              message: this.curruser + " is requesting " + result.numToBuy + " items for $"
                + result.askingPriceDollars + "." + ((result.askingPriceCents < 10) ? "0" + result.askingPriceCents : result.askingPriceCents)
                + " each, with a meeting point at " + temp2,
            } as ChatMessageItem).subscribe((output) => {
              console.log(output);
              // Redirect to the chat page
              var params = new URLSearchParams();
              params.set('currEmail', this.curruser);
              params.set('otherEmail', sellerEmail.sellerEmail);
              params.set('productID', "" + this.id);
              this.router.navigate(
                ['/chat-window'], {queryParams: {
                currEmail: this.curruser,
                otherEmail: sellerEmail.sellerEmail,
                productID: this.id
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

  saveTag(id: string) {
    console.log(id)
    let request = this.http.get<any>('api/accounts/'+this.curruser+'/', {observe: "body"});
    request.subscribe((data: any) => {
      console.log(data)
      this.userTags = data["savedTags"]
      console.log(this.userTags)
      for (let i = 0; i < this.userTags.length; i++) {
        if (this.userTags[i] == "null") {
          this.userTags.splice(i, 1)
          break;
        }
      }
      var hasTag = false
      for (let i = 0; i < this.userTags.length; i++) {
        if (this.userTags[i] == id) {
          this.userTags.splice(i, 1)
          hasTag = true
          break;
        }
      }
      if (!hasTag) {
        this.userTags.push(id)
      }
      if (hasTag) {
        alert("Removed tag " + id + " from your saved tags.")
      } else {
        alert("Added tag " + id + " to your saved tags.")
      }
      console.log(this.userTags)
      if (this.userTags.length == 0) {
        this.userTags.push("null")
      }
      var body = {
        savedTags: this.userTags
      };
      var request = this.http.patch<any>(`http://localhost:8000/api/accounts/`+this.curruser+'/', body, {observe: "response"});
      request.subscribe((data: any) => {
        console.log("Request sent!");
      });
    });
    // var hasTag = false
    // for (let i = 0; i < this.userTags.length; i++) {
    //   if (this.userTags[i] == id) {
    //     this.userTags.splice(i, 1)
    //     hasTag = true
    //     break;
    //   }
    // }
    // if (!hasTag) {
    //   this.userTags.push(id)
    // }
    // var body = {
    //   savedTags: this.userTags
    // };
    // var request = this.http.patch<any>(`http://localhost:8000/api/accounts/`+this.curruser+'/', body, {observe: "response"});
    // request.subscribe((data: any) => {
    //   console.log("Request sent!");
    // });
  }
}
