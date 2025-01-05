import { TestBed } from '@angular/core/testing';

import { MailTemplateRequestService } from './mail-template-request.service';

describe('MailTemplateRequestService', () => {
  let service: MailTemplateRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailTemplateRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
