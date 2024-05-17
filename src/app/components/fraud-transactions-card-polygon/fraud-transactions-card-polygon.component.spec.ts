import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudTransactionsCardPolygonComponent } from './fraud-transactions-card-polygon.component';

describe('FraudTransactionsCardPolygonComponent', () => {
  let component: FraudTransactionsCardPolygonComponent;
  let fixture: ComponentFixture<FraudTransactionsCardPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FraudTransactionsCardPolygonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraudTransactionsCardPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
