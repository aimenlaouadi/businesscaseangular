import { TestBed } from '@angular/core/testing';

import { ProfiluserService } from './profiluser.service';

describe('ProfiluserService', () => {
  let service: ProfiluserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfiluserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
