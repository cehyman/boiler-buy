import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PictureUploadComponent } from '../picture-upload/picture-upload.component';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  name: string = '';
  price: string = '';
  shipPrice: string = '';
  description: string = '';
  stock: number = 1;
  canMeet: boolean = true;
  canShip: boolean = false;
  type: string = 'Electronics';

  prodId: number = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe, 
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Get the product ID of the product we need to edit
    var urlStr = this.activatedRoute.snapshot.url.toString();
    var id: number = Number(urlStr.split(',')[1]);
    if(isNaN(id)) {
      alert(`Invalid URL "${urlStr}": "${id}"`);
      return;
    }
    
    this.prodId = id;
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    console.log(`Loading product with id "${id}"`);
    
    var request = this.http.get<any>(`api/products/${id}`, {observe: "body"});
    request.subscribe((data: any) => {
      // Set the fields that can be set out of the box
      this.name = data.name;
      this.description = data.description;
      this.stock = data.stockCount;
      this.canMeet = data.canMeet;
      this.canShip = data.canShip;
      this.type = data.productType;

      this.price = this.dollarsCentsToString(data.priceDollars, data.priceCents);

      if(this.canShip)
        this.shipPrice = this.dollarsCentsToString(data.shippingDollars, data.shippingCents);
      else
        this.shipPrice = '';
    });
  }

  dollarsCentsToString(dollars: number, cents: number): string {
    // The cents field needs to be padded out with a '0' so that it is
    // always 2 characters
    var centsStr = (cents < 10 ? '0' : '') + cents.toString();
    return `$${dollars}.${centsStr}`;
  }

  onBlurPrice(event: FocusEvent) {
    this.price = this.transformPriceStr(this.price);
  }

  onBlurShipPrice(event: FocusEvent) {
    this.shipPrice = this.transformPriceStr(this.shipPrice);
  }

  transformPriceStr(price: string): string {
    var num = this.price.replace(/(\$|\,)/gm, '');

    //If the input is not a number, don't try to convert it. 
    if(isNaN(Number(num)))
      return '';
    else
      return this.currencyPipe.transform(num, '$') ?? '';
  }

  currencyToDollarsCents(price: string): [number, number] {
    let strippedString = price.replace(/(\,|\$)/gm, '');
    if(strippedString == '')
      return [0, 0];
    
    let split = strippedString.split('.', 2);

    if(split.length != 2) {
      alert(`Error splitting price string: "${price}"`);
    }

    let dollars: number = Number(split[0]);
    let cents: number = Number(split[1]);

    if(isNaN(dollars))
      alert(`Error: dollar amount of "${price}" is not a number`);
    if(isNaN(cents))
      alert(`Error: cents amount of "${price}" is not a number`);

    return [dollars, cents];
  }

  submit() {
    //var files = this.picUpload.getFiles()[0];
    let [priceDollars, priceCents] = this.currencyToDollarsCents(this.price);
    
    var shipDollars = 0, shipCents = 0;

    if(this.canShip) {
      [shipDollars, shipCents] = this.currencyToDollarsCents(this.shipPrice);
    }

    var requestBody = {
      productType: this.type,
      priceDollars: priceDollars,
      priceCents: priceCents,
      shippingDollars: shipDollars,
      shippingCents: shipCents,
      stockCount: this.stock,
      name: this.name,
      description: this.description,
      canShip: this.canShip,
      canMeet: this.canMeet
    };

    var request = this.http.put<any>(`/api/products/${this.prodId}/`, requestBody, {observe: "response"});
    request.subscribe((data: any) => {
      console.log("Request sent!");
    })
  }
}
