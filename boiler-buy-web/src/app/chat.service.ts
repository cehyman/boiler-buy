import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { Observable } from 'rxjs';
import { ChatMessageItem } from './chat-types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  constructor(private http: HttpClient) { }

  sendMessage(data: ChatMessageItem): Observable<any> {
    var formData = new FormData();
    formData.append("sender", data.senderEmail);
    formData.append("receiver", data.receiverEmail);
    formData.append("message", data.message);
    formData.append("productID", `${data.productID}`);

    var request = this.http.post<any>("api/chatMessages/", formData, {observe: "response"});

    return request;
  }
}
