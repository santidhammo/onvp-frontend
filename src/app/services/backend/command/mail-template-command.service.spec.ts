import { TestBed } from '@angular/core/testing';

import { MailTemplateCommandService } from './mail-template-command.service';

describe('MailTemplateCommandService', () => {
  let service: MailTemplateCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailTemplateCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
