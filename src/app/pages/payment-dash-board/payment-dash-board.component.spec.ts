import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDashBoardComponent } from './payment-dash-board.component';

describe('PaymentDashBoardComponent', () => {
  let component: PaymentDashBoardComponent;
  let fixture: ComponentFixture<PaymentDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
