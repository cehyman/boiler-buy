import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-general-chat',
  templateUrl: './general-chat.component.html',
  styleUrls: ['./general-chat.component.css']
})
export class GeneralChatComponent implements OnInit {
  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  messages = [{"name":"Jerry", message:"Hi there!", date:"date here"}, {"name":"You", message:"Hey Jerry!", date:"date here"}];
  id = -1;

  // The current user's information
  curremail = "";
  curruser = "";
  
  // The other user's information (who the current user is talking to)
  otheremail = "";
  otheruser = "";
  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.globals.username = <string> this.appcomp.getUsername()
    
    if (this.appcomp.getUsername()) {
      this.curruser = <string> this.appcomp.getUsername()
    } else {
      this.curruser = "Username"
    }

    this.curremail = <string> this.appcomp.getEmail()

    //get messages
    var urlStr = this.activatedRoute.snapshot.url.toString();
    this.id = Number(urlStr.split(',')[1]);

    var messagesURL = "api/chatMessages/"+this.id+"/";
    var request = this.http.get(messagesURL, {observe:'response'});
    request.subscribe((data: any) => {
      console.log(data)
      // this.messages = data["body"]["sellerRatingCount"]
      // this.reviewAvg = data["body"]["sellerRating"]
      // this.reviews = data["body"]["sellerReviews"]
      // this.curremail = data["body"]["email"]
      // this.curruser = data["body"]["username"]  
    })
  }

  sendMessage(message: string) {
    if (message != "") {
      console.log("clicked!", message);

      var formData = new FormData();
      formData.append("sender", this.curremail);
      formData.append("receiver", this.otheremail);
      formData.append("message", message);
      console.log(formData)

      var messagesURL = "api/chatMessages/";//+this.id+"/";
      var request = this.http.post<any>(messagesURL, formData, {observe: "response"});

      request.subscribe((data: any) => {
        console.log("Request sent!");
        //on success, add it to the array for this component so the user can see
        window.scroll(0, document.documentElement.offsetHeight);
      })
      this.messages = this.messages.concat([{"name": this.curruser, "message": message, "date":"now"}]);
      window.scroll(0, document.documentElement.offsetHeight);
    }
  }

}
