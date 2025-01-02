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

import { Component } from '@angular/core';
import { WizardPaneComponent } from '../../../../wizard/wizard-pane.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../../services/handlers/error-handler.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MailTemplateCommandService } from '../../../../../services/backend/command/mail-template-command.service';
import { CreateMailTemplateCommand } from '../../../../../model/commands/create-mail-template-command';

@Component({
  standalone: true,
  imports: [
    WizardPaneComponent,
    AsyncPipe,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
  ],
  templateUrl: './create.component.html',
  styles: ``,
})
export class CreateComponent {
  constructor(
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private mailTemplateCommandService: MailTemplateCommandService,
  ) {}

  form = new FormGroup({
    name: new FormControl<string>({ value: '', disabled: false }),
    body: new FormControl<string>({ value: '', disabled: false }),
  });

  async finish() {
    const name = this.form.controls.name.value;
    const body = this.form.controls.body.value;
    if (name && body) {
      const command = new CreateMailTemplateCommand(name, body);
      try {
        await this.mailTemplateCommandService.create(command);
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
