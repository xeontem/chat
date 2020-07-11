import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  rooms: Observable<any[]>;

  constructor(
    public firestore: FirestoreService,
  ) {
    this.rooms = firestore.getRooms();
  }

  ngOnInit(): void {
  }

  logoutClick() {
    this.firestore.logout();
  }
}
