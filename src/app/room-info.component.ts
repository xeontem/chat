import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { User } from '../store/type-defs';
import { selectUser } from '../store/selectors';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {
  public user: User;

  constructor(
    public store: Store,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe(user => {
      this.user = user;
      this.ref.detectChanges();
    });
  }

}
