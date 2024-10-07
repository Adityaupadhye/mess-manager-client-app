import { TestBed } from '@angular/core/testing';

import { IndexDbServiceService } from './index-db-service.service';

describe('IndexDbServiceService', () => {
  let service: IndexDbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexDbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
