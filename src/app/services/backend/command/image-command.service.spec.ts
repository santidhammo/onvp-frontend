import { TestBed } from '@angular/core/testing';

import { ImageCommandService } from './image-command.service';

describe('ImageCommandService', () => {
  let service: ImageCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
