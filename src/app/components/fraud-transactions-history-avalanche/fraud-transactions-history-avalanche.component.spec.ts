import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudTransactionsHistoryAvalancheComponent } from './fraud-transactions-history-avalanche.component';

describe('FraudTransactionsHistoryAvalancheComponent', () => {
  let component: FraudTransactionsHistoryAvalancheComponent;
  let fixture: ComponentFixture<FraudTransactionsHistoryAvalancheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FraudTransactionsHistoryAvalancheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraudTransactionsHistoryAvalancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
