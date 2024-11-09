/*
 *  ONVP Frontend - Frontend of the ONVP website
 *
 * Copyright (c) 2024.  Sjoerd van Leent
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

import { Component, input, OnInit, output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { PageCommandService } from '../../../services/backend/command/page-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { Observable } from 'rxjs';
import { CreatePageCommand } from '../../../model/commands/create-page-command';
import { MemberRegisterCommand } from '../../../model/commands/member-register-command';

@Component({
  selector: 'config-create-page',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    CancelComponent,
    DialogComponent,
    ExplanationComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    NgIf,
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
  ],
  templateUrl: './create-page.component.html',
})
export class CreatePageComponent implements OnInit {
  constructor(
    private pageCommandService: PageCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  enabledInput = input.required<Observable<boolean>>();
  onSaved = output();
  onCancelled = output();
  model = new CreatePageCommand();

  ngOnInit() {
    this.enabledInput().subscribe((enabled) => {
      if (!enabled) {
        this.model = new CreatePageCommand();
      }
    });
  }
  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      this.pageCommandService
        .create(this.model)
        .then(() => this.onSaved.emit())
        .catch((error) => this.errorHandlerService.handle(error));
    } else {
      this.onCancelled.emit();
    }
  }

  observeEnabled(): Observable<boolean> {
    return this.enabledInput();
  }
}
