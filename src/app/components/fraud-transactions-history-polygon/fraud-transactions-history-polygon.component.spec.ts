import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudTransactionsHistoryPolygonComponent } from './fraud-transactions-history-polygon.component';

describe('FraudTransactionsHistoryPolygonComponent', () => {
  let component: FraudTransactionsHistoryPolygonComponent;
  let fixture: ComponentFixture<FraudTransactionsHistoryPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FraudTransactionsHistoryPolygonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraudTransactionsHistoryPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
