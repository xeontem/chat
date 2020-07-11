import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as All from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../store/type-defs';
import { setUser } from '../store/actions/actions';
import { AuthReducer } from '../store/reducers';

type OnLoginStateChange = Subject<User>;

type OnLoginSucc = Subject<any>;

type OnLoginErr = Subject<{
  message: String;
}>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  onLoginStateChange$: OnLoginStateChange = new Subject();
  onLoginSucc$: OnLoginSucc = new Subject();
  onLoginErr$: OnLoginErr = new Subject();

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) {
    this.auth.onAuthStateChanged((user: User) => {
      const nextUser = user ? {
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email
      } : null;
      this.store.dispatch(setUser({ user: nextUser }));
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
}
