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
  brands = [
    {name:'Acer', value:'Acer', checked:false},
    {name:'Lenovo', value:'Lenovo', checked:false},
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
      // console.log(productList);
      this.products = productList;
      this.loading = false;
    });
  }

  buttonSearchClick() {
    this.loading = true;
    this.products = [];
    this.productService.filterSearch(this.filters).subscribe((productList) => {
      // console.log(productList);
      this.products = productList;
      this.loading = false;
    })
  }

  applyFilters() {
    //change filters
    var temp =  this.types
      .filter(type => type.checked)
      .map(type => type.value)
    // console.log(temp)
    this.filters.productType = temp
    var temp2 = this.brands.filter(brand => brand.checked).map(brand => brand.value)
    this.filters.brand = temp2
    // console.log(this.filters.productType)
    console.log(this.filters.minSellerRating)
    console.log(this.filters.maxSellerRating)
    this.loading = true;
    this.products = [];
    this.productService.filterSearch(this.filters).subscribe((productList) => {
      // console.log(productList);
      this.products = productList;
      this.loading = false;
    })
  }

}