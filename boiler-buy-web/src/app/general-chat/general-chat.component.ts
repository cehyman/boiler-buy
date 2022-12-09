import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChatMessageItem, ChatGroup, ChatGroupPK, ChatGroupFull } from '../chat-types';
import { ChatService } from '../chat.service';
import { Globals } from '../globals';
import { Product } from '../product-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-general-chat',
  templateUrl: './general-chat.component.html',
  styleUrls: ['./general-chat.component.scss']
})
export class GeneralChatComponent implements OnInit {
  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  //blocked users vars
  blockedList: string[] = []
  blockedListOtherEmail: string[] = []
  isBlocked: boolean = false

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

  address = '';


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

    this.checkBlock()

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
          this.address = cg.shippingAddress;
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
          this.address = cg.shippingAddress;
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

      //recheck block list
      this.checkBlock()
      if (this.isBlocked) {
        console.log("blocked from sending a message")
        alert("Unable to send message")
      } else {
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

  saveAddress() {
     var pk = this.chatService.getChatGroupID({
      seller: this.chatInfo.otherEmail,
      buyer: this.chatInfo.currEmail,
      productID: this.chatInfo.productID,
    } as ChatGroupPK).subscribe((id) => {
      console.log('id', id.body);

      let params = new URLSearchParams()
      params.set("id", id.body);
      params.set("function", "update_shipping_address");
      params.set("shippingAddress", this.address)


      this.http.get('api/chatGroup/?' + params.toString(), {responseType: 'json'}).subscribe()

    })
  }

  checkBlock() {
    var request = this.http.get<any>('api/accounts/'+this.chatInfo.currEmail+'/', {observe: "body"});
    request.subscribe((data: any) => {
      console.log(data)
      let checkBlockList = data.blockedUsers
      console.log(checkBlockList)

      //check if user is already in blocked list
      var inList = false;
      for(let i = 0; i < checkBlockList.length; i++) {
        if (checkBlockList[i] === this.chatInfo.otherEmail) {
          inList = true;
          break;
        }
      }

      if(inList) {
        // alert("user blocked")
        this.isBlocked = true
      }
    })
  }
  
  blockUser() {
    //add to block column in account db to both buyer and seller 

    //request to backend to add to blocked users
    //get the blocked users list
    var request = this.http.get<any>('api/accounts/'+this.chatInfo.currEmail+'/', {observe: "body"});
    request.subscribe((data: any) => {
      console.log(data)
      this.blockedList = data.blockedUsers
      console.log(this.blockedList)

      console.log("trying to block " + this.chatInfo.otherEmail)

      //check if user is already in blocked list
      var inList = false;
      for(let i = 0; i < this.blockedList.length; i++) {
        if (this.blockedList[i] === this.chatInfo.otherEmail) {
          inList = true;
          break;
        }
      }

      if(inList) {
        alert("already blocked")
        return;
      }

      this.blockedList.push(<string>this.chatInfo.otherEmail)

      var body = {
        blockedUsers: this.blockedList
      }

      //send another request to update the current users block list
      var request2 = this.http.patch<any>(`http://localhost:8000/api/accounts/`+this.chatInfo.currEmail+'/', body, {observe: "response"});
      request2.subscribe((data: any) => {
        console.log("Added " + this.chatInfo.otherEmail + " to Blocked List")
        this.isBlocked = true
      })
    })

    //add to other emails blocked list
    var request3 = this.http.get<any>('api/accounts/'+this.chatInfo.otherEmail+'/', {observe: "body"});
    request3.subscribe((data: any) => {
      console.log(data)
      this.blockedListOtherEmail = data.blockedUsers
      console.log(this.blockedList)

      console.log("trying to block " + this.chatInfo.currEmail)

      //check if user is already in blocked list
      var inList = false;
      for(let i = 0; i < this.blockedListOtherEmail.length; i++) {
        if (this.blockedListOtherEmail[i] === this.chatInfo.currEmail) {
          inList = true;
          break;
        }
      }

      if(inList) {
        alert("already blocked")
        return;
      }

      this.blockedListOtherEmail.push(<string>this.chatInfo.currEmail)

      var body = {
        blockedUsers: this.blockedListOtherEmail
      }

      //send another request to update the current users block list
      var request4 = this.http.patch<any>(`http://localhost:8000/api/accounts/`+this.chatInfo.otherEmail+'/', body, {observe: "response"});
      request4.subscribe((data: any) => {
        console.log("Added " + this.chatInfo.currEmail + " to Blocked List")
        this.isBlocked = true
      })
    })
  }
}
