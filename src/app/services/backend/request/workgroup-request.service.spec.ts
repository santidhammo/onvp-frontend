import { TestBed } from '@angular/core/testing';

import { WorkgroupRequestService } from './workgroup-request.service';

describe('WorkgroupRequestService', () => {
  let service: WorkgroupRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkgroupRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
