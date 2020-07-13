import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { selectIsSideNavOpened } from '../store/selectors';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainAppComponent implements OnInit {
  isOpened: Boolean = true;
  events: string[] = [];

  constructor(
    public store: Store,
    private ref: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.store.pipe(select(selectIsSideNavOpened)).subscribe(isOpened => {
      this.isOpened = isOpened;
      this.ref.detectChanges();
    });
  }
}
