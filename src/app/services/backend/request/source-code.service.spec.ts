import { TestBed } from '@angular/core/testing';

import { SourceCodeService } from './source-code.service';

describe('SourceCodeService', () => {
  let service: SourceCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
