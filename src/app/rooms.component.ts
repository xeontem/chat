import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
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

}
