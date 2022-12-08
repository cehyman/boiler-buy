import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import { GroupAdInput, Product } from '../product-types';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-group-ad',
  templateUrl: './create-group-ad.component.html',
  styleUrls: ['./create-group-ad.component.css']
})
export class CreateGroupAdComponent implements OnInit {
  public globals: Globals = new Globals;

  private appcomp: AppComponent = new AppComponent();

  curruser:string = ''
  currpass:string = ''
  curremail:string = ''
  shop_id:number = 0
  products: any = []
  productList: Product[] = []

  groupAdList: GroupAdInput[] = []

  name: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.appcomp.getUsername()) {
      this.curruser = <string> this.appcomp.getUsername()
    } else {
      this.curruser = "Username"
    }

    this.currpass = <string> this.appcomp.getPassword()
    this.curremail = <string> this.appcomp.getEmail()
    this.shop_id = <number> <unknown> this.appcomp.getShopID()

    this.getUserProducts()
  }

  submit() {

    var filterAds = this.groupAdList.filter(ad => ad.checked).map(ad => ad.product_id)
    //console.log(filterAds)

    var formData = new FormData();
    formData.append("name", this.name)
    //formData.append("username", this.curruser)
    formData.append("email", this.curremail)

    for (var i = 0; i < filterAds.length; i++) {
      formData.append("products", `${filterAds[i]}`)
      console.log(filterAds[i])
    }

    var request = this.http.post<any>("api/groupAds/", formData, {observe: "response"})

    request.subscribe((data: any) => {
      console.log("Request sent!")
    })

    alert("Created Grouped Ad!")
  }

  getUserProducts() {
    //create a get request to get all products from a users shop
    var request = this.http.get<any>('api/shops/' + this.shop_id, {observe: "body"})

    request.subscribe(data => {
      console.log(data)

      this.products = data.products

      let i = 0
      for (i = 0; i < this.products.length; i++) {
        console.log("product id: " + this.products[i])

        //create a product type and add to productList in order to display on screen
        var req2 = this.http.get('api/products/' + this.products[i], {responseType: 'json'}) as Observable<Product>
        req2.subscribe((data:any) => {
          //console.log(data)
          //this.productList.push(data)

          let item = {name: data['name'], product_id: data['id'], checked:false}
          this.groupAdList.push(item)
          console.log(item)
        })
      }
    })
  }

}
