/*
 *  ONVP Backend - Backend API provider for the ONVP website
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

import { Component, Input, output } from '@angular/core';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { MemberRegistrationCommand } from '../../../model/commands/member-registration-command';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { MemberCommandService } from '../../../services/backend/command/member-command.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'config-register-member',
  standalone: true,
  imports: [
    BodyComponent,
    DialogComponent,
    ExplanationComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    SubmitComponent,
    TextEntryComponent,
    CancelComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './config-register-member.component.html',
})
export class ConfigRegisterMemberComponent {
  constructor(
    private memberCommandService: MemberCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  enabled$ = new BehaviorSubject<boolean>(false);
  onSaved = output();
  model = new MemberRegistrationCommand();

  @Input()
  get enabled(): boolean {
    return this.enabled$.value;
  }

  set enabled(enabled: boolean) {
    if (!enabled) {
      this.model = new MemberRegistrationCommand();
    }
    this.enabled$.next(enabled);
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      this.memberCommandService
        .register(this.model)
        .then(this.onSaved.emit)
        .catch(this.errorHandlerService.handle);
    }
    this.enabled = false;
  }

  observeEnabled(): Observable<boolean> {
    return this.enabled$.asObservable();
  }
}
