import { TestBed } from '@angular/core/testing';

import { RolesCommandService } from './roles-command.service';

describe('RolesCommandService', () => {
  let service: RolesCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
