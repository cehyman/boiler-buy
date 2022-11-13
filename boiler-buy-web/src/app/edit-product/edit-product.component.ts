import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureUploadComponent } from '../picture-upload/picture-upload.component';
import { Globals } from '../globals';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
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

  prodId: number = -1;

  @ViewChild('picUpload') picUpload !: PictureUploadComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe, 
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
  ) { }

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

    // Get the product ID of the product we need to edit
    var urlStr = this.activatedRoute.snapshot.url.toString();
    var id: number = Number(urlStr.split(',')[1]);
    if(isNaN(id)) {
      alert(`Invalid URL "${urlStr}": "${id}"`);
      return;
    }
    
    this.prodId = id;
    this.loadProduct(id);
  }

  loadProduct(id: number) {
   
    console.log(`Loading product with id "${id}"`);
    
    var request = this.http.get<any>(`api/products/${id}`, {observe: "body"});
    request.subscribe((data: any) => {
      // Set the fields that can be set out of the box
      this.name = data.name;
      this.description = data.description;
      this.stock = data.stockCount;
      this.canMeet = data.canMeet;
      this.canShip = data.canShip;
      this.type = data.productType;
      this.brand = data.brand;

      console.log(this.brand)

      this.price = this.dollarsCentsToString(data.priceDollars, data.priceCents);

      if(this.canShip)
        this.shipPrice = this.dollarsCentsToString(data.shippingDollars, data.shippingCents);
      else
        this.shipPrice = '';
      
      console.log(`data: ${data}`)
    });

    var imageRequest = this.http.get<any>(`api/products/${id}/retrieveImages`, {observe: "body"});
    imageRequest.subscribe((data: any) => {
      for (const name of data) {
        this.picUpload.loadFromDatabase(name);
      }
    })
  }

  dollarsCentsToString(dollars: number, cents: number): string {
    // The cents field needs to be padded out with a '0' so that it is
    // always 2 characters
    var centsStr = (cents < 10 ? '0' : '') + cents.toString();
    return `$${dollars}.${centsStr}`;
  }

  onBlurPrice(event: FocusEvent) {
    this.price = this.transformPriceStr(this.price);
  }

  onBlurShipPrice(event: FocusEvent) {
    this.shipPrice = this.transformPriceStr(this.shipPrice);
  }

  transformPriceStr(price: string): string {
    var num = this.price.replace(/(\$|\,)/gm, '');

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
    let [priceDollars, priceCents] = this.currencyToDollarsCents(this.price);
    
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
    formData.append("brand", this.brand);
    formData.append("username", this.curruser);

    var request = this.http.patch<any>(`/api/products/${this.prodId}/`, formData, {observe: "response"});
    request.subscribe((data: any) => {
      console.log("Request sent!");
    });

    // Add any images that were not already in the database, but rather added
    // by the user. If there are none, we can skip this request. This needs to
    // be a seperate request because the normal patch method doesn't add new
    // images for some reason.
    var files: File[] = this.picUpload.getNewFiles();
    if(files.length > 0) {
      // Add each of the files to the form data
      let imageFormData = new FormData();
      for (var i = 0; i < files.length; i++) {
        var file: File = files[i];
        imageFormData.append("images", file, file.name);
      }

      // Send the request
      let imageRequest = this.http.patch<any>(
        `api/products/${this.prodId}/addImages/`, 
        imageFormData, 
        {observe: "response"}
      );
      imageRequest.subscribe((data: any) => {
        console.log("Sent image!");
      });
    }

    // Remove any files that were in the database and now need to be removed.
    // If none exist, we don't need to bother with anything. If they do, 
    // we need to send a new request to the removeImages action on the product.
    // This needs to be a seperate request since the normal patch method doesn't
    // let us update the image list
    var filesToRemove: File[] = this.picUpload.getExistingFilesToRemove();
    if(filesToRemove.length > 0) {
      // Go through the list of files to remove and add them to the form data
      let imageFormData = new FormData();
      for (var i = 0; i < filesToRemove.length; i++) {
        var file: File = filesToRemove[i];
        let name = file.name.replace(/\/media\//, ''); // Remove the /media/
        imageFormData.append("images", name);
      }

      // Send the request
      let imageRequest = this.http.patch<any>(
        `api/products/${this.prodId}/removeImages/`, 
        imageFormData, 
        {observe: "response"}
      );
      imageRequest.subscribe((data: any) => {
        console.log("Removed image!");
      });
    }

  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '75wh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
      if (result != undefined && result) {
        this.deleteAd();
      }
    });
  }

  deleteAd() {
    console.log('placeholder for deleting the ad');
    //send delete request
    this.http.delete(`/api/products/${this.prodId}/`).subscribe((response) => {
      alert('Product deleted successfully.');
      this.router.navigate(['/profile/'])
    }, (error) => {
      console.log(error);
      alert('There was an error. Refresh and try again.');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
