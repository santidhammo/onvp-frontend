import { TestBed } from '@angular/core/testing';

import { FacebookRequestService } from './facebook-request.service';

describe('FacebookRequestService', () => {
  let service: FacebookRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
