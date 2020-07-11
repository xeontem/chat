import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainAppComponent implements OnInit {
  rooms: any[];

  constructor(
    public firestore: FirestoreService,
    private ref: ChangeDetectorRef
  ) {
    firestore.getRooms().subscribe(rooms => {
      this.rooms = rooms;
      this.ref.detectChanges();
    });
  }

  ngOnInit(): void {
  }

  logoutClick() {
    this.firestore.logout();
  }
}
