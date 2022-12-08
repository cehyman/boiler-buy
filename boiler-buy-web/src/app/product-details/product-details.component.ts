import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { PictureCarouselComponent } from '../picture-carousel/picture-carousel.component';
import { locationInterface } from '../product-types';

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
  temp: any = []
  locationList: locationInterface[] = []


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
    var request = this.http.get('api/products/' + this.id, {observe: "body"})
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
      this.temp = data['locations'];
      //console.log(this.temp)

      for (var i = 0; i < this.temp.length; i++) {
        //console.log(this.temp[i])
        let loc = {location: this.temp[i], value: this.temp[i], checked:false}
        this.locationList.push(loc)
      }
      //console.log(data['locations'])
      console.log(this.locationList)
      // var locLabel = document.getElementById("locationLabel")
      // for (var i = 0; i < this.locations.length; i++) {
      //     if (locLabel != null) {
      //       console.log(this.locations[i])
      //       if (i == this.locations.length-1) {
      //         locLabel.innerHTML += this.locations[i]
      //       } else {
      //         locLabel.innerHTML += this.locations[i] + ", "
      //       }
      //     }
      //   };
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

  buy() {

    var temp2 = this.locationList.filter(location => location.checked).map(location => location.value)
    for (var i = 0; i < temp2.length; i++) {
      //formData.append("locations", temp2[i])
    }

    this.productService.purchaseOne(this.id, this.locationList).subscribe(
      data => {
        console.log(data.message);
        alert("Purchase Successful! Meeting Seller at " + temp2);
        this.router.navigate(['/sellerReview/' + this.id]);
      },
      error => {
        console.log('purchase failed:', error.error);
        alert("Purchase Failed, try again.")
        this.stock = error.error.remainingStock;
      }
    )
  }
}
