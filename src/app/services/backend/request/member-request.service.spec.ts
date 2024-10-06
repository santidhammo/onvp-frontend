import { TestBed } from '@angular/core/testing';

import { MemberRequestService } from './member-request.service';

describe('MembersService', () => {
  let service: MemberRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
