import { TestBed } from '@angular/core/testing';

import { MemberCommandService } from './member-command.service';

describe('MemberCommandService', () => {
  let service: MemberCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
