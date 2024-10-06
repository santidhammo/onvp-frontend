import { TestBed } from '@angular/core/testing';

import { EditMemberPictureService } from './edit-member-picture.service';

describe('EditMemberPictureService', () => {
  let service: EditMemberPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMemberPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
