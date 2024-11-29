import { TestBed } from '@angular/core/testing';

import { MusicalInstrumentRequestService } from './musical-instrument-request.service';

describe('MusicalInstrumentRequestService', () => {
  let service: MusicalInstrumentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicalInstrumentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
