import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';



@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  errMessage: String;

  constructor(
    private store: Store,
    public firestore: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.firestore.onLoginErr$.subscribe(err => {
      this.errMessage = err.message;
    });
  }

  loginClick() {
    this.firestore.login();
  }
}
