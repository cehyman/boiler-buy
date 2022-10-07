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
    
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    console.log(`Loading product with id "${id}"`);
    
    var request = this.http.get<any>(`api/products/${id}`, {observe: "body"});
    request.subscribe((data: any) => {
      this.name = data.name;
      this.description = data.description;
      this.stock = data.stockCount;
      this.canMeet = data.canMeet;
      this.canShip = data.canShip;
    });
  }

  onBlurPrice(event: FocusEvent) {

  }

  onBlurShipPrice(event: FocusEvent) {

  }

  submit() {

  }

}
