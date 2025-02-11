import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailureComponentComponent } from './payment-failure-component.component';

describe('PaymentFailureComponentComponent', () => {
  let component: PaymentFailureComponentComponent;
  let fixture: ComponentFixture<PaymentFailureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFailureComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFailureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
