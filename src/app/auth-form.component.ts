import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  errMessage: String;

  constructor(
    public firestore: FirestoreService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.firestore.onLoginErr$.subscribe(err => {
      this.errMessage = err.message;
      this.ref.detectChanges();
    });
  }

  loginClick() {
    this.firestore.login();
  }
}
