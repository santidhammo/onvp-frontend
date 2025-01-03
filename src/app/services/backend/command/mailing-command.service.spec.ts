import { TestBed } from '@angular/core/testing';

import { MailingCommandService } from './mailing-command.service';

describe('MailingCommandService', () => {
  let service: MailingCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailingCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
