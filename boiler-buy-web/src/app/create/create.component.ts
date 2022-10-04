import { CurrencyPipe, formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  name: string = '';
  price: string = '';
  description: string = '';
  stock: number = 1;

  constructor(private currencyPipe: CurrencyPipe, private http: HttpClient) {
  }

  ngOnInit(): void {
  }  

  transformPrice(event: FocusEvent) {
    var num = this.price.replace(/(\$|\,)/gm, '');
    if(isNaN(Number(num))) {
      this.price = '';
    }
    else {
      var formatted = this.currencyPipe.transform(num, '$');
      var target = event.target as HTMLInputElement;
  
      if(formatted != null)
        this.price = formatted;
      else
        this.price = '';
    }
  }

  submit() {
    // Convet the currency to a number to store in the database
    var strippedString = this.price.replace(/(\,|\$)/gm, '');
    var numPrice: number = Number(strippedString);
    var requestBody = {
      name: this.name,
      price: numPrice,
      description: this.description,
      stock: this.stock
    };

    var request = this.http.post<any>("/api/v1/listings/", requestBody, {observe: "response"});

    request.subscribe((data: any) => {
      console.log("Request sent!");
    })
  }
}
