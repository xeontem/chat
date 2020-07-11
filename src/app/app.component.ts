import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { User } from '../store/type-defs';
import { selectUser } from '../store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
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
