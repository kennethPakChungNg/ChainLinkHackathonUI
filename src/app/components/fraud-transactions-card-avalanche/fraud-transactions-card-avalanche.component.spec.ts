import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudTransactionsCardAvalancheComponent } from './fraud-transactions-card-avalanche.component';

describe('FraudTransactionsCardAvalancheComponent', () => {
  let component: FraudTransactionsCardAvalancheComponent;
  let fixture: ComponentFixture<FraudTransactionsCardAvalancheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FraudTransactionsCardAvalancheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraudTransactionsCardAvalancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
