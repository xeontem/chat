import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftContainerComponent } from './left-container.component';

describe('LeftContainerComponent', () => {
  let component: LeftContainerComponent;
  let fixture: ComponentFixture<LeftContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
