import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import { PictureUploadComponent } from '../picture-upload/picture-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public globals: Globals = new Globals;

  private appcomp: AppComponent = new AppComponent();

  curruser:string = ''
  currpass:string = ''
  curremail:string = ''

  name: string = '';
  price: string = '';
  shipPrice: string = '';
  description: string = '';
  stock: number = 1;
  canMeet: boolean = true;
  canShip: boolean = false;
  type: string = 'Electronics';
  brand: string = 'Acer';

  @ViewChild('picUpload') picUpload !: PictureUploadComponent;

  constructor(private currencyPipe: CurrencyPipe, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log("Starting value of gloabl username is %s", this.globals.username)
    console.log("But value of saved username in session saver is $s",this.appcomp.getUsername())
    this.globals.username = <string> this.appcomp.getUsername()

    if (this.appcomp.getUsername()) {
      this.curruser = <string> this.appcomp.getUsername()
    } else {
      this.curruser = "Username"
    }

    this.currpass = <string> this.appcomp.getPassword()
    this.curremail = <string> this.appcomp.getEmail()
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
    var file = this.picUpload.getFiles()[0];
    
    let [priceDollars, priceCents] = this.currencyToDollarsCents(this.price);
    
    console.log(`Product Type: ${this.type}`);

    var shipDollars = 0, shipCents = 0;

    if(this.canShip) {
      [shipDollars, shipCents] = this.currencyToDollarsCents(this.shipPrice);
    }

    var formData = new FormData();
    formData.append("productType", this.type);
    formData.append("priceDollars", `${priceDollars}`);
    formData.append("priceCents", `${priceCents}`);
    formData.append("shippingDollars", `${shipDollars}`);
    formData.append("shippingCents", `${shipCents}`);
    formData.append("stockCount", `${this.stock}`);
    formData.append("name", this.name);
    formData.append("description", this.description);
    formData.append("canShip", `${this.canShip}`);
    formData.append("canMeet", `${this.canMeet}`);
    formData.append("image", file);
    formData.append("username", this.curruser);
    formData.append("brand", this.brand);

    var request = this.http.post<any>("/api/products/", formData, {observe: "response"});

    request.subscribe((data: any) => {
      console.log("Request sent!");
    })
  }
}
