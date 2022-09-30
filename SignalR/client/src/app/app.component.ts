import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: string = "";
  usernameSet: boolean = false;
  message: string = "";
  connection: any | undefined;
  messages: MessageModel[] = [];

  ngOnInit(): void {

    this.connection = new HubConnectionBuilder().withUrl(`${environment.api}/chathub`).build();

    this.connection.start().then(function () {
      console.log("SignalR Connected!");
    }).catch(function (err: Error) {
      return console.error(err.toString());
    });

    this.connection.on("ReceiveMessage", (user: string, message: string) => {
      console.log("Received Message ", message);
      this.messages = [...this.messages, new MessageModel(user, message)];
      console.log(this.messages);
    })

  }

  setUsername() {
    this.usernameSet = true;
  }

  sendMessage() {
    this.connection.invoke("SendMessage", this.user, this.message);
    this.message = "";
  }
}

class MessageModel {
  user: string;
  message: string;

  constructor(user: string, message: string) {
    this.user = user;
    this.message = message;
  };
}