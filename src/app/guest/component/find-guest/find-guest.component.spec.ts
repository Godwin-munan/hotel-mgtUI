import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindGuestComponent } from './find-guest.component';

describe('FindGuestComponent', () => {
  let component: FindGuestComponent;
  let fixture: ComponentFixture<FindGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
