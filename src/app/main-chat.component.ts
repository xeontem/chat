import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { selectSelectedChat, selectUser } from '../store/selectors';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainChatComponent implements OnInit {
  chatMessages: any;
  curUserMail: String = '';

  constructor(
    public store: Store,
    private ref: ChangeDetectorRef,
  ) {
    this.store.pipe(select(selectSelectedChat)).subscribe(selectedChat => {
      this.chatMessages = selectedChat
        ? [...selectedChat.messages].sort((a, b) => a.date > b.date ? 1 : -1)
        : [];
      this.ref.markForCheck();
    });

    this.store.pipe(select(selectUser)).subscribe(user => {
      this.curUserMail = user ? user.email : '';
      this.ref.detectChanges();
    });
  }

  ngOnInit(): void {
  }

}
