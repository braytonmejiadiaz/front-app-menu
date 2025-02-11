import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPendingComponentComponent } from './payment-pending-component.component';

describe('PaymentPendingComponentComponent', () => {
  let component: PaymentPendingComponentComponent;
  let fixture: ComponentFixture<PaymentPendingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPendingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPendingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
