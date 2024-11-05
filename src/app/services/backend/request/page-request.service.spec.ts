import { TestBed } from '@angular/core/testing';

import { PageRequestService } from './page-request.service';

describe('PageRequestServiceService', () => {
  let service: PageRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
