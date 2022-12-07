import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { PictureCarouselComponent } from '../picture-carousel/picture-carousel.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
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
  locations: string[] = []
  tagsTemp: string[] = []
  tags: string[] = []
  userTags: string[] = []

  curruser: string = ''

  private appcomp: AppComponent = new AppComponent();

  @ViewChild('carousel') carousel !: PictureCarouselComponent;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private productService: ProductService) {

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
      this.locations = data['locations'];
      this.tagsTemp = data['tags']
      for (let i = 0; i < this.tagsTemp.length; i++) {
        if (this.tagsTemp[i] == "null") {
          this.tagsTemp.splice(i, 1)
          break;
        }
      }
      this.tags = this.tagsTemp
      console.log(data['locations'])
      console.log(this.locations)
      var locLabel = document.getElementById("locationLabel")
      for (var i = 0; i < this.locations.length; i++) {
          if (locLabel != null) {
            console.log(this.locations[i])
            if (i == this.locations.length-1) {
              locLabel.innerHTML += this.locations[i]
            } else {
              locLabel.innerHTML += this.locations[i] + ", "
            }
          }
        };
      // this.loadProductDetails()
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

  buy() {
    this.productService.purchaseOne(this.id).subscribe(
      data => {
        console.log(data.message);
        alert("Purchase Successful!");
        this.router.navigate(['/sellerReview/' + this.id]);
      },
      error => {
        console.log('purchase failed:', error.error);
        alert("Purchase Failed, try again.")
        this.stock = error.error.remainingStock;
      }
    )
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
