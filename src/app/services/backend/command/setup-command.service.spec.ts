import { TestBed } from '@angular/core/testing';

import { SetupCommandService } from './setup-command.service';

describe('SetupCommandService', () => {
  let service: SetupCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
