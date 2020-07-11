import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { User } from '../store/type-defs';
import { selectUser } from '../store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe(user => {
      this.user = user;
    });
  }
}
