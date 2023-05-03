import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuestRoomComponent } from './add-guest-room.component';

describe('AddGuestRoomComponent', () => {
  let component: AddGuestRoomComponent;
  let fixture: ComponentFixture<AddGuestRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGuestRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuestRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
