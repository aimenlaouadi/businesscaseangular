import { TestBed } from '@angular/core/testing';

import { BusinescasproductService } from './businescasproduct.service';

describe('BusinescasproductService', () => {
  let service: BusinescasproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinescasproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
