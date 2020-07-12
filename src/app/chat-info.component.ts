import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {

  constructor(
    public firestore: FirestoreService,
  ) { }

  ngOnInit(): void {
  }

  logoutClick() {
    this.firestore.logout();
  }

}
