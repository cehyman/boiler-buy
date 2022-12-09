import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChatMessageItem, ChatGroup, ChatGroupPK, ChatGroupFull, ChatGroupFull2 } from '../chat-types';
import { ChatService } from '../chat.service';
import { Globals } from '../globals';
import { Product } from '../product-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-general-chat',
  templateUrl: './general-chat.component.html',
  styleUrls: ['./general-chat.component.css']
})
export class GeneralChatComponent implements OnInit {
  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  public chatInfo: ChatGroup = {currEmail: "", otherEmail: "", productID: 0} as ChatGroup;

  messages: {name:string, message:string, date:string, image:string}[] = [];
  id = -1;
  isSeller: boolean = false;
  canShip: boolean = false;

  // For the actual purchase:
  pricedPerUnit = true;
  isShipping = false;
  trackingNum = '';
  trackingLink = '';
  willAccept = false;
  sellerMin = 0;
  quantityToBuy = 1;
  price = '';
  shippingPrice = '';
  chatGroupID = -1;

  // Store the image path for the current user
  public currImage: string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, 
    private router: Router, private chatService: ChatService, private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.chatInfo.currEmail = this.activatedRoute.snapshot.queryParamMap.get('currEmail') || "";
    this.chatInfo.otherEmail = this.activatedRoute.snapshot.queryParamMap.get('otherEmail') || "";
    this.chatInfo.productID = +(this.activatedRoute.snapshot.queryParamMap.get('productID') || "");

    //get messages
    var urlStr = this.activatedRoute.snapshot.queryParamMap;
    this.id = +(urlStr.get('productID') || -1);
    console.log('id:' + this.id)

    var urlParams = new URLSearchParams();
    urlParams.set('id', "" + this.id)

    this.chatService.getMessages({
      currEmail: this.appcomp.getEmail(),
      otherEmail: this.chatInfo.otherEmail,
      productID: this.chatInfo.productID
    } as ChatGroup).subscribe((stuff) => {
      console.log(stuff.body);

      stuff.body.forEach((element:any) => {
        // If the given element is the sent by the current user, set the image
        // we are storing for the current user. This avoids a HTTP request
        if (element.sender_id == this.chatInfo.currEmail) {
          this.currImage = element.senderImage
        }

        this.messages = this.messages.concat({
          "name": element.sender_id,
          message: element.message,
          date: element.timestamp,
          image: element.senderImage,
        })
      });
    });

    // determine if the current user is the buyer or the seller
    this.productService.getProductsSellerEmail(this.id).subscribe((sellerEmail) => {
      console.log('email: '+ sellerEmail.sellerEmail);
      if (this.chatInfo.currEmail == sellerEmail.sellerEmail) {
        this.isSeller = true;
      } else {
        this.isSeller = false;
      }

      if (this.isSeller) {
        //get tracking info
        this.chatService.getChatGroup({
          seller: this.chatInfo.currEmail,
          buyer: this.chatInfo.otherEmail || '',
          productID: +(this.chatInfo.productID || '')
        }).subscribe((output) => {
          var cg = output.body as ChatGroupFull;
          this.trackingLink = cg.trackingLink;
          this.trackingNum = cg.trackingNumber;
        })
      } else {
        //get tracking info
        this.chatService.getChatGroup({
          seller: this.chatInfo.otherEmail || '',
          buyer: this.chatInfo.currEmail,
          productID: +(this.chatInfo.productID || '')
        }).subscribe((output) => {
          var cg = output.body as ChatGroupFull;
          this.trackingLink = cg.trackingLink;
          this.trackingNum = cg.trackingNumber;
        })  
      }
      
    });

    this.productService.getProductFromID(this.id).subscribe((product:Product) => {
      this.canShip = product.canShip;
    })
  }

  sendMessage(message: string) {
    if (message != "") {
      console.log("clicked!", message);

      this.chatService.sendMessage({
        senderEmail: this.chatInfo.currEmail,
        receiverEmail: this.chatInfo.otherEmail,
        productID: this.chatInfo.productID,
        message: message
      } as ChatMessageItem).subscribe((success) => {

        this.messages = this.messages.concat([{"name": this.chatInfo.currEmail, "message": message, "date":"now", image: this.currImage}]);
        window.scroll(0, document.documentElement.offsetHeight);
        console.log(success)
      }, (error) => {
        console.log(error)
        alert("There was an issue with sending your message. Please try again")
      })
    }
  }

  saveTrackingNumber() {
    console.log(this.trackingLink);
    console.log(this.trackingNum);

    var pk = this.chatService.getChatGroupID({
      seller: this.chatInfo.currEmail,
      buyer: this.chatInfo.otherEmail,
      productID: this.chatInfo.productID,
    } as ChatGroupPK).subscribe((id) => {
      console.log('id', id.body);
      var body = {
        "trackingNumber": this.trackingNum,
        "trackingLink": this.trackingLink,
        "function": "update_tracking"
      };

      let params = new URLSearchParams()
      params.set("id", id.body);
      params.set("trackingNumber", this.trackingNum);
      params.set("trackingLink", this.trackingLink);
      params.set("function", "update_tracking");


      this.http.get('api/chatGroup/?' + params.toString(), {responseType: 'json'}).subscribe()

    })
  }

  sendDecision() {
    console.log('sending dec')
    let message:string;
    if (this.willAccept) {
      message = this.chatInfo.currEmail + " accepted your offer."
    } else {
      message = this.chatInfo.currEmail + " declined your offer, stating a minimum of $" + this.sellerMin;
    }
    let newMessage = {
      senderEmail: this.chatInfo.currEmail,
      receiverEmail: this.chatInfo.otherEmail || '',
      productID: this.chatInfo.productID || -1,
      image: this.currImage,
      message: message
    } as ChatMessageItem

    let nM = {
      name: this.chatInfo.currEmail,
      message: message,
      date: 'now',
      image: this.currImage,
    }

    this.chatService.sendMessage(newMessage).subscribe((output) => {
      console.log(output)
      this.messages = this.messages.concat([nM])
    })

    //mark the item is sold in the database
    if (this.willAccept) {
      let priceDollars = this.price.split('.')[0]
      let priceCents = this.price.split('.')[1]

      let shippingPriceDollars = this.shippingPrice.split('.')[0]
      let shippingPriceCents = this.shippingPrice.split('.')[1]

      console.log('productID:', this.chatInfo.productID)
      console.log('quantity:', this.quantityToBuy)
      console.log('priceDollars:', priceDollars)
      console.log('priceCents:', priceCents)
      console.log('shippingDollars:', shippingPriceDollars)
      console.log('shippingCents:', shippingPriceCents)
      console.log('chatGroupID:', this.chatGroupID)
      console.log('isShipping:', this.isShipping)

      // this.productService.purchaseManyWithPrice(
      //   this.chatInfo.productID || -1,
      //   this.quantityToBuy,
      //   +priceDollars,
      //   +priceCents,
      //   +shippingPriceDollars,
      //   +shippingPriceCents
      // ).subscribe((output) =>{
      //   console.log(output);
      // });

      // this.chatService.chatGroupPurchase({
      //   id: this.chatGroupID,
      //   shippingPriceDollars: +shippingPriceDollars,
      //   shippingPriceCents: +shippingPriceCents,
      //   isShipping: this.isShipping,
      //   finalPriceDollars: +priceDollars,
      //   finalPriceCents: +priceCents,
      //   quantity: this.quantityToBuy,
      // } as ChatGroupFull2).subscribe((output2) => {
      //   console.log(output2)
      //   alert("Marked as Purchased!")
      // });
    }
  
    //trigger venmo tags to be sent
  }
}
