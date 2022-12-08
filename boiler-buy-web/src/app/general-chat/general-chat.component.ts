import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChatMessageItem, ChatGroup } from '../chat-types';
import { ChatService } from '../chat.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-general-chat',
  templateUrl: './general-chat.component.html',
  styleUrls: ['./general-chat.component.css']
})
export class GeneralChatComponent implements OnInit {
  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  public chatInfo: ChatGroup = {currEmail: "", otherEmail: "", productID: 0} as ChatGroup;

  messages: {name:string, message:string, date:string}[] = [];
  id = -1;


  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, 
    private router: Router, private chatService: ChatService,
    ) { }

  ngOnInit(): void {
    this.chatInfo.currEmail = this.activatedRoute.snapshot.queryParamMap.get('currEmail') || "";
    this.chatInfo.otherEmail = this.activatedRoute.snapshot.queryParamMap.get('otherEmail') || "";
    this.chatInfo.productID = +(this.activatedRoute.snapshot.queryParamMap.get('productID') || "");

    //get messages
    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.id = Number(urlStr.split(',')[1]);

    var urlParams = new URLSearchParams();
    urlParams.set('id', "" + this.id)

    this.chatService.getMessages({
      currEmail: this.appcomp.getEmail(),
      otherEmail: this.chatInfo.otherEmail,
      productID: this.chatInfo.productID
    } as ChatGroup).subscribe((stuff) => {
      console.log(stuff.body);
      stuff.body.forEach((element:any) => {
        this.messages = this.messages.concat({
          "name": element.sender_id,
          message: element.message,
          date: element.timestamp
        })
      });
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
        this.messages = this.messages.concat([{"name": this.chatInfo.currEmail, "message": message, "date":"now"}]);
        window.scroll(0, document.documentElement.offsetHeight);
        console.log(success)
      }, (error) => {
        console.log(error)
        alert("There was an issue with sending your message. Please try again")
      })
    }
  }

}
