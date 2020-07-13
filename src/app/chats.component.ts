import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { FirestoreService } from './firestore.service';
import { selectUserChats } from '../store/selectors';
import { setSelectedChat } from '../store/actions/actions';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnInit {
  indexOfSelectedChat: Number;
  chats: any[];
  errorMessage: String;

  constructor(
    public store: Store,
    private ref: ChangeDetectorRef,
    public firestore: FirestoreService,
  ) {
    this.store.pipe(select(selectUserChats)).subscribe(chats => {
      this.chats = chats;
      this.ref.markForCheck();
    });
  }

  ngOnInit(): void {
  }

  detectChanges() {
    this.ref.detectChanges();
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const email = e.target.elements[0].value;
    this.errorMessage = '';
    this.ref.detectChanges();

    this.firestore.addChatWithUser(email).subscribe(res => {
      this.errorMessage = (res.errorInfo && res.errorInfo.message) || '';

      if (!this.errorMessage) {
        e.target.elements[0].value = '';
      }

      this.ref.detectChanges();
    });
  }

  setSelectedChat(chat, index) {
    this.indexOfSelectedChat = index;
    this.store.dispatch(setSelectedChat({ chat }));
  }

}
