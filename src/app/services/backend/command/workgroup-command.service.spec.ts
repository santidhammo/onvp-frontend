import { TestBed } from '@angular/core/testing';

import { WorkgroupCommandService } from './workgroup-command.service';

describe('WorkgroupCommandService', () => {
  let service: WorkgroupCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkgroupCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
