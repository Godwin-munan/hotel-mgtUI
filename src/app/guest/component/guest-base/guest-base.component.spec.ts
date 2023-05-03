import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBaseComponent } from './guest-base.component';

describe('GuestBaseComponent', () => {
  let component: GuestBaseComponent;
  let fixture: ComponentFixture<GuestBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
