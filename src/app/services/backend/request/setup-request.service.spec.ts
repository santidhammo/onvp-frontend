import { TestBed } from '@angular/core/testing';

import { SetupRequestService } from './setup-request.service';

describe('SetupDetectorService', () => {
  let service: SetupRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
