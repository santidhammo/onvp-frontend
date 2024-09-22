import { TestBed } from '@angular/core/testing';

import { MemberRegistrationService } from './member-registration.service';

describe('RegisterMemberServiceService', () => {
  let service: MemberRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
