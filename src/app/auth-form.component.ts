import { Component, OnInit } from '@angular/core';
import { FirestoreService, User } from './firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  // TODO: move user to the store
  user: User;

  errMessage: String;

  constructor(public firestore: FirestoreService) { }

  ngOnInit(): void {
    this.firestore.onLoginStateChange$.subscribe(user => {
      this.user = user;
    });

    this.firestore.onLoginErr$.subscribe(err => {
      this.errMessage = err.message;
    });
  }

  loginClick() {
    this.firestore.login();
  }

  logoutClick() {
    this.firestore.logout();
  }

}
