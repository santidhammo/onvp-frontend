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
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../../../services/handlers/error-handler.service';
import { MailTemplateRequestService } from '../../../../../services/backend/request/mail-template-request.service';
import { MailTemplateCommandService } from '../../../../../services/backend/command/mail-template-command.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CreateMailTemplateCommand } from '../../../../../model/commands/create-mail-template-command';
import { UpdateMailTemplateCommand } from '../../../../../model/commands/update-mail-template-command';
import { WizardPaneComponent } from '../../../../wizard/wizard-pane.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    WizardPaneComponent,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './update.component.html',
  styles: ``,
})
export class UpdateComponent implements OnInit {
  private id$ = new BehaviorSubject<number>(0);
  private name$ = new BehaviorSubject<string>('');
  private body$ = new BehaviorSubject<string>('');

  form = new FormGroup({
    body: new FormControl<string>({ value: '', disabled: false }),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private mailTemplateRequestService: MailTemplateRequestService,
    private mailTemplateCommandService: MailTemplateCommandService,
  ) {}

  async ngOnInit() {
    firstValueFrom(this.route.paramMap).then(async (params) => {
      try {
        const id = parseInt(String(params.get('id')));
        console.log(id);
        const template = await this.mailTemplateRequestService.find(id);
        this.id$.next(id);
        this.name$.next(template.name);
        this.form.patchValue({ body: template.body });
      } catch (error) {
        this.errorHandlerService.handle(error as HttpErrorResponse);
      }
    });
  }

  protected get observeName(): Observable<string> {
    return this.name$.asObservable();
  }

  protected get observeBody(): Observable<string> {
    return this.body$.asObservable();
  }

  async finish() {
    const body = this.form.controls.body.value;
    if (body) {
      const command = new UpdateMailTemplateCommand(body);
      try {
        await this.mailTemplateCommandService.update(this.id$.value, command);
        await this.router.navigateByUrl('/mailing');
      } catch (error: any) {
        this.errorHandlerService.handle(error);
      }
    }
  }

  async previous() {
    try {
      await this.router.navigateByUrl('/mail/template-wizard/start');
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
}
