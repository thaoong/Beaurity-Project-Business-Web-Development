import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupStatusComponent } from './popup-status.component';

describe('PopupStatusComponent', () => {
  let component: PopupStatusComponent;
  let fixture: ComponentFixture<PopupStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupStatusComponent]
    });
    fixture = TestBed.createComponent(PopupStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
