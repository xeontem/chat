import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Store, select } from '@ngrx/store';

import { toggleSideNav } from '../store/actions/actions';
import { selectSelectedChat } from '../store/selectors';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInfoComponent implements OnInit {
  userInput: String;
  selectedChat: any;

  constructor(
    public firestore: FirestoreService,
    public store: Store,
    private ref: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectSelectedChat)).subscribe(selectedChat => {
      this.selectedChat = selectedChat;
      this.ref.markForCheck();
    });
  }

  logoutClick() {
    this.firestore.logout();
  }

  sidenavToggle() {
    this.store.dispatch(toggleSideNav());
  }

}
