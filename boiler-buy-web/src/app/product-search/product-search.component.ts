import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Product, FilterSearchInput, GroupAdObj, GroupAdList } from '../product-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  products: Product[] = [];
  groupAds: GroupAdObj[] = []
  types = [
    {name:'Food', value:'Food', checked:false},
    {name:'Electronics', value:'Electronics', checked:false},
  ]
  brands = [
    {name:'Acer', value:'Acer', checked:false},
    {name:'Lenovo', value:'Lenovo', checked:false},
  ]
  tagList = [
    {name:'Old', value:'Old', checked:false},
    {name:'New', value:'New', checked:false},
    {name:'Phone', value:'Phone', checked:false},
  ]
  filters: FilterSearchInput = {} as FilterSearchInput;
  
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  loading: boolean = true;
  sticky: boolean = false;
  menuPosition: any;

  @ViewChild('stickyMenu') menuElement: ElementRef<HTMLInputElement> = {} as ElementRef;
  

  constructor(private productService: ProductService, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.getProductList();
    this.getGroupAds()
  }

  ngAfterViewInit() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }

  getProductList() {
    this.loading = true;
    this.productService.getProductList().subscribe((productList) => {
      console.log(productList);
      this.products = productList;
      this.loading = false;
    });
  }

  getGroupAds() {
    this.loading = true;
    var request = this.http.get('api/groupAds/', {responseType: 'json'}) as Observable<GroupAdList>

    request.subscribe((data:any) => {
      console.log(data)
      this.groupAds = data
    })
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

    this.filters.tags = this.tagList.filter(tag => tag.checked).map(tag => tag.value)

    console.log(this.filters.tags);

    this.loading = true;
    this.products = [];
    this.productService.filterSearch(this.filters).subscribe((productList) => {
      // console.log(productList);
      this.products = productList;
      this.loading = false;
    })
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}