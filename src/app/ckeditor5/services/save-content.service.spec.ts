import { TestBed } from '@angular/core/testing';

import { SaveContentService } from './save-content.service';

describe('SaveContentService', () => {
  let service: SaveContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
