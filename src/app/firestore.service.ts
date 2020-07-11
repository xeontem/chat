import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, Subject } from 'rxjs';

export type User = {
  photoURL: String;
  displayName: String;
  email: String;
};

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
    private firestore: AngularFirestore
  ) {
    auth.onAuthStateChanged((user: User) => {
      this.onLoginStateChange$.next(user);
    });
  }

  getRooms(): Observable<any> {
    return this.firestore.collection('rooms').valueChanges();
  }

  login(): void {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider())
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
