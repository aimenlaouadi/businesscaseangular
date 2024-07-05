import { TestBed } from '@angular/core/testing';

import { BusinescasserviceService } from './businescasservice.service';

describe('BusinescasserviceService', () => {
  let service: BusinescasserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinescasserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
