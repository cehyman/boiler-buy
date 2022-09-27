import { Component, OnInit } from '@angular/core';
import { Product } from '../product-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {

  search: String = "";

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    //TODO: do api call to get the list of products, with applicable filters applied
    //save the list to the array 'products'
    //this.getProductList();

    //in place of the api call:
    this.dothis();
  }

  async dothis():Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.products = [{name: "shoes", priceDollars: 45} as Product, {name: "new car", priceDollars: 2} as Product];
    await new Promise(resolve => setTimeout(resolve, 750));
    this.products.push({name: "newItem", priceDollars: 108} as Product);
  }

  getProductList() {
    this.productService.getProductList().subscribe((productList) => {
      this.products = productList;
    });
  }

  
}