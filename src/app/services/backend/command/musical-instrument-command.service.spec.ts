import { TestBed } from '@angular/core/testing';

import { MusicalInstrumentCommandService } from './musical-instrument-command.service';

describe('MusicalInstrumentCommandService', () => {
  let service: MusicalInstrumentCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicalInstrumentCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
