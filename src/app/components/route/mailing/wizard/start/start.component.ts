/*
 *  ONVP Frontend - Frontend of the ONVP website
 *
 * Copyright (c) 2025.  Sjoerd van Leent
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Component, OnInit } from '@angular/core';
import { WizardPaneComponent } from '../../../../wizard/wizard-pane.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { MailTemplateNameResponse } from '../../../../../model/responses/mail-template-name-response';
import { MailTemplateRequestService } from '../../../../../services/backend/request/mail-template-request.service';
import { ErrorHandlerService } from '../../../../../services/handlers/error-handler.service';
import { Router } from '@angular/router';
import { MailRecipientType } from '../../../../../generic/primitive/mail-recipient-type';

@Component({
  selector: 'mail-wizard-start',
  standalone: true,
  imports: [WizardPaneComponent, ReactiveFormsModule, AsyncPipe, NgForOf],
  templateUrl: './start.component.html',
  styles: ``,
})
export class StartComponent implements OnInit {
  private mailTemplateNames = new BehaviorSubject<MailTemplateNameResponse[]>(
    [],
  );

  private nextEnabled$ = new BehaviorSubject<boolean>(false);

  form = new FormGroup({
    templateSelection: new FormControl<number | null>({
      value: null,
      disabled: false,
    }),
    recipientType: new FormControl<MailRecipientType | null>({
      value: MailRecipientType.MEMBER,
      disabled: false,
    }),
    subject: new FormControl<string>({
      value: '',
      disabled: false,
    }),
  });

  constructor(
    private mailTemplateRequestService: MailTemplateRequestService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      let listing = await this.mailTemplateRequestService.list();
      this.mailTemplateNames.next(listing);
    } catch (error: any) {
      this.errorHandlerService.handle(error);
    }
  }

  protected get observeItems(): Observable<MailTemplateNameResponse[]> {
    return this.mailTemplateNames.asObservable();
  }

  protected get observeNextEnabled(): Observable<boolean> {
    return this.nextEnabled$.asObservable();
  }

  evaluateNextButton() {
    const enableNext =
      this.form.controls.templateSelection.value !== null &&
      this.form.controls.subject.value !== null &&
      this.form.controls.subject.value !== '';
    this.nextEnabled$.next(enableNext);
  }

  async next() {
    try {
      const templateSelection = this.form.controls.templateSelection.value;
      const recipientType = this.form.controls.recipientType.value;
      const subject = this.form.controls.subject.value;
      if (templateSelection && recipientType && subject) {
        switch (recipientType) {
          case MailRecipientType.MEMBER:
            await this.router.navigate(
              ['/mail/wizard/member-recipient/' + templateSelection],
              { queryParams: { subject: subject } },
            );
            break;
          case MailRecipientType.WORKGROUP:
            await this.router.navigate(
              ['/mail/wizard/workgroup-recipient/' + templateSelection],
              { queryParams: { subject: subject } },
            );
            break;
          case MailRecipientType.MUSICAL_INSTRUMENT:
            await this.router.navigate(
              [
                '/mail/wizard/musical-instrument-recipient/' +
                  templateSelection,
              ],
              { queryParams: { subject: subject } },
            );
            break;
        }
      }
    } catch (error: any) {
      this.errorHandlerService.handle(error);
    }
  }

  async cancel() {
    try {
      await this.router.navigateByUrl('/mailing');
    } catch (error: any) {
      this.errorHandlerService.handle(error);
    }
  }

  protected readonly MailRecipientType = MailRecipientType;
}
