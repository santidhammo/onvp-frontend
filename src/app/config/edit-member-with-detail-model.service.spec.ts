import { TestBed } from '@angular/core/testing';

import { EditMemberWithDetailModelService } from './edit-member-with-detail-model.service';

describe('EditMemberWithDetailModelService', () => {
  let service: EditMemberWithDetailModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMemberWithDetailModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
