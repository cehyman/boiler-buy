import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {

  search: String = "";

  products: product[] = [];

  constructor() { }

  ngOnInit(): void {
    //TODO: do api call to get the list of products, with applicable filters applied
    //save the list to the array 'products'

    //this.products = [{"title": "shoes", price: 45}, {"title": "new car", price: 2}];
    this.dothis();
  }

  async dothis():Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.products = [{"title": "shoes", price: 45}, {"title": "new car", price: 2}];
    await new Promise(resolve => setTimeout(resolve, 750));
    this.products.push({"title": "newItem", price: 108});
  }

  
}

type product = {
  title: String,
  price: number,
}