import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableGuestComponent } from './available-guest.component';

describe('AvailableGuestComponent', () => {
  let component: AvailableGuestComponent;
  let fixture: ComponentFixture<AvailableGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
