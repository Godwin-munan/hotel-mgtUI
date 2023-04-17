import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBaseComponent } from './payment-base.component';

describe('PaymentBaseComponent', () => {
  let component: PaymentBaseComponent;
  let fixture: ComponentFixture<PaymentBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
