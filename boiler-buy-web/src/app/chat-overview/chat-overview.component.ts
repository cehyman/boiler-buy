import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ChatGroup } from '../chat-types';
import { ChatService } from '../chat.service';
import { Product } from '../product-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss']
})
export class ChatOverviewComponent implements OnInit {
  private appcomp: AppComponent = new AppComponent();

  allChats:ChatGroup[] = [];

  constructor(
    private chatService: ChatService, 
    private productService: ProductService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.chatService.getUsersChats({
      currEmail: <string> this.appcomp.getEmail()
    } as ChatGroup).subscribe((response) => {
      console.log(response.body)
      var unique:ChatGroup[] = []
      response.body.forEach((element:any) => {
        var otherPersonEmail = element.sender_id;
        var isUnique = true;
        let otherImage = element.senderImage;
        let currImage =  element.receiverImage;
        if (otherPersonEmail == <string> this.appcomp.getEmail()) {
          otherPersonEmail = element.receiver_id;

          let tmp = otherImage;
          otherImage = currImage;
          currImage = tmp;
        }

        console.log(`other image: ${otherImage}`)
        console.log(`curr image: ${currImage}`)

        var newChatGroup:ChatGroup = {
          currEmail: <string> this.appcomp.getEmail(),
          otherEmail: otherPersonEmail,
          productID: element.productID_id,
          currImage: currImage,
          otherImage: otherImage,
        };

        if (unique.length == 0) {
          unique = unique.concat(newChatGroup);
        } else {
          unique.forEach((element) => {
            if (this.chatGroupsEqual(element, newChatGroup)) {
              isUnique = false;
            } else {
              unique = unique.concat(newChatGroup);
            }
          })
        }

        if (isUnique) {
          this.productService.getProductFromID(newChatGroup.productID as number).subscribe((product:Product) => {
            // Also fetch the product image here
            console.log(product.name)
            newChatGroup.productName = product.name;
            this.allChats = this.allChats.concat([newChatGroup])
          });
        }
      });
    });
  }

  chatGroupsEqual(cg1:ChatGroup, cg2:ChatGroup): boolean {
    return ((
        cg1.currEmail == cg2.currEmail &&
        cg1.otherEmail == cg2.otherEmail && 
        cg1.productID == cg2.productID
      ) || (
        cg1.currEmail == cg2.otherEmail &&
        cg1.otherEmail == cg2.currEmail && 
        cg1.productID == cg2.productID
      )
    );
  }

}
