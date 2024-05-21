import { TestBed } from '@angular/core/testing';

import { AvalancheService } from './avalanche.service';

describe('AvalancheService', () => {
  let service: AvalancheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvalancheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
