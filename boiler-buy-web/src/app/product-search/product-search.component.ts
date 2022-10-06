import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Product, FilterSearchInput } from '../product-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
  products: Product[] = [];
  types = [
    {name:'Food', value:'Food', checked:false},
    {name:'Electronics', value:'Electronics', checked:false},
  ]
  filters: FilterSearchInput = {} as FilterSearchInput;
  
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  loading: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.loading = true;
    this.productService.getProductList().subscribe((productList) => {
      console.log(productList);
      this.products = productList;
      this.loading = false;
    });
  }

  buttonSearchClick() {
    this.loading = true;
    this.products = [];
    this.productService.filterSearch(this.filters).subscribe((productList) => {
      console.log(productList);
      this.products = productList;
      this.loading = false;
    })
  }

  applyFilters() {
    //change filters
    var temp =  this.types
      .filter(type => type.checked)
      .map(type => type.value)
    console.log(temp)
    this.filters.productType = temp
    console.log(this.filters.productType)
    this.loading = true;
    this.products = [];
    this.productService.filterSearch(this.filters).subscribe((productList) => {
      console.log(productList);
      this.products = productList;
      this.loading = false;
    })
  }

}