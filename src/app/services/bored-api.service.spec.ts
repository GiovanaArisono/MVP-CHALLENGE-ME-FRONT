import { TestBed } from '@angular/core/testing';

import { BoredAPIService } from './bored-api.service';

describe('BoredAPIService', () => {
  let service: BoredAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoredAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
