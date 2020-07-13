import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import * as All from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../store/type-defs';
import { setUser, setUserChats, updateChatMessages } from '../store/actions/actions';

type OnLoginStateChange = Subject<User>;

type OnLoginSucc = Subject<any>;

type OnLoginErr = Subject<{
  message: String;
}>;

type OnFriendAdded = Subject<any>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  onLoginStateChange$: OnLoginStateChange = new Subject();
  onLoginSucc$: OnLoginSucc = new Subject();
  onLoginErr$: OnLoginErr = new Subject();
  onFriendAdded$: OnFriendAdded = new Subject();

  addChatWithUserFn: (data: any) => Observable<any>;
  addMessageFn: (data: any) => Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private functions: AngularFireFunctions,
    private store: Store
  ) {
    this.userChatsStream();
    this.addChatWithUserFn = this.functions.httpsCallable('addChatWithUser');
    this.addMessageFn = this.functions.httpsCallable('addMessage');


    this.auth.onAuthStateChanged((user: User) => {
      const nextUser = user ? {
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email
      } : null;
      this.store.dispatch(setUser({ user: nextUser }));
    });
  }

  sendMessage(msg, friendEmail) {
    return this.addMessageFn({ msg, friendEmail }).subscribe(data => {
      console.log(data);
    });
  }

  userChatsStream() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.firestore.collection(`usersData/${user.uid}/chats`).valueChanges({ idField: 'name' }).subscribe(chats => {
          this.store.dispatch(setUserChats({ chats }));
          chats.forEach(chat => {
            this.firestore.collection(`usersData/${user.uid}/chats/${chat.name}/messages`).valueChanges().subscribe(messages => {
              this.store.dispatch(updateChatMessages({ name: chat.name, messages }));
            });
          })
        });
      }
    });
  }

  getRooms(): Observable<any> {
    return this.firestore.collection('rooms').valueChanges();
  }

  login(): void {
    this.auth.signInWithPopup(new All.auth.GoogleAuthProvider())
      .then(user => {
        this.onLoginSucc$.next(user);
      })
      .catch(err => {
        this.onLoginErr$.next(err);
      });
  }

  logout() {
    this.auth.signOut();
  }

  addChatWithUser(email) {
    const stream$ = this.addChatWithUserFn({ email }).pipe(share());
    return stream$;
  }
}
