import { TestBed } from '@angular/core/testing';

import { PageCommandService } from './page-command.service';

describe('PageCommandServiceService', () => {
  let service: PageCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
