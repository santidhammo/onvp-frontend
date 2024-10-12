import { TestBed } from '@angular/core/testing';

import { RolesRequestService } from './roles-request.service';

describe('RolesRequestService', () => {
  let service: RolesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
