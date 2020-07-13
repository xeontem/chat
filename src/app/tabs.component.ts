import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  tabsClickHandler() {
    this.ref.markForCheck();
  }

}
