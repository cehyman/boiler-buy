import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PictureUploadComponent } from '../picture-upload/picture-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  name: string = '';
  price: string = '';
  shipPrice: string = '';
  description: string = '';
  stock: number = 1;
  canMeet: boolean = true;
  canShip: boolean = false;
  type: string = 'Electronics';

  @ViewChild('picUpload') picUpload !: PictureUploadComponent;

  constructor(private currencyPipe: CurrencyPipe, private http: HttpClient) {
  }

  ngOnInit(): void {
  }  

  onBlurPrice(event: FocusEvent) {
    this.price = this.transformPriceStr(this.price);
  }

  onBlurShipPrice(event: FocusEvent) {
    this.shipPrice = this.transformPriceStr(this.shipPrice);
  }

  transformPriceStr(price: string): string {
    var num = price.replace(/(\$|\,)/gm, '');

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
    
    console.log(`Product Type: ${this.type}`);

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

    var request = this.http.post<any>("/api/products/", requestBody, {observe: "response"});

    request.subscribe((data: any) => {
      console.log("Request sent!");
    })
  }
}
