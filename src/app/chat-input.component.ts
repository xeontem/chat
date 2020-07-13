import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FirestoreService } from './firestore.service';

import { selectSelectedChat } from '../store/selectors';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent implements OnInit {
  selectedChat: any;

  constructor(
    private ref: ChangeDetectorRef,
    public store: Store,
    public firestore: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectSelectedChat)).subscribe(selectedChat => {
      this.selectedChat = selectedChat;
      this.ref.markForCheck();
    });
  }

  detectChanges() {
    this.ref.detectChanges();
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const msg = e.target.elements[0].value;
    e.target.elements[0].value = '';
    if (this.selectedChat) {
      this.firestore.sendMessage(msg, this.selectedChat.name);
    }
  }

}
