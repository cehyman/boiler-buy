import { CurrencyPipe, formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  name: string = '';
  price: string = '';
  prevPrice: string = '';
  description: string = '';

  constructor(private currencyPipe: CurrencyPipe) { 

  }

  ngOnInit(): void {
  } 

  transformPrice(event: FocusEvent) {
    var formatted = this.currencyPipe.transform(this.price, '$');
    var target = event.target as HTMLInputElement;

    if(formatted != null) {
      this.price = formatted;
    }
    else {
      target.value = ''
    }
  }

  submit() {

  }
}
