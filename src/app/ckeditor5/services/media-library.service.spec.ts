import { TestBed } from '@angular/core/testing';

import { MediaLibraryService } from './media-library.service';

describe('PictureLibraryService', () => {
  let service: MediaLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
