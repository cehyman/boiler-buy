import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { Observable } from 'rxjs';
import { ChatGroup, ChatGroupPK, ChatMessageItem } from './chat-types';

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

    return this.http.post<any>("api/chatMessages/", formData, {observe: "response"});
  }

  getUsersChats(data: ChatGroup): Observable<any> {
    var urlParams = new URLSearchParams();
    urlParams.set('function', 'getMessageList');
    urlParams.set('currEmail', data.currEmail);
    urlParams.set('otherEmail', "" + data.otherEmail);
    urlParams.set('productID', "" + data.productID);

    return this.http.get("api/chatMessages/?" + urlParams.toString(), {observe:'response'});
  }

  getMessages(data: ChatGroup): Observable<any> {
    var urlParams = new URLSearchParams();
    urlParams.set('function', 'getMessages');
    urlParams.set('currEmail', data.currEmail);
    urlParams.set('otherEmail', "" + data.otherEmail);
    urlParams.set('productID', "" + data.productID);

    return this.http.get("api/chatMessages/?" + urlParams.toString(), {observe:'response'});
  }

  createChatGroup(data: ChatGroup): Observable<any> {
    var formData = new FormData();
    formData.append("buyer", data.currEmail);
    formData.append("seller", data.otherEmail || '');
    formData.append("productID", `${data.productID}`);

    return this.http.post<any>("api/chatGroup/", formData, {observe: "response"});
  }

  getChatGroupID(data: ChatGroupPK):Observable<any> {
    var urlParams = new URLSearchParams();
    urlParams.set('seller', data.seller);
    urlParams.set('buyer', data.buyer);
    urlParams.set('productID', "" + data.productID);

    return this.http.get("api/chatGroup/?" + urlParams.toString(), {observe:'response'});
  }

  getChatGroupList(): Observable<any> {
    return this.http.get('api/chatGroup/', {responseType: 'json'}) as Observable<any>;
  }
}
