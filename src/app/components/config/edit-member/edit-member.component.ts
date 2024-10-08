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

import { Component, input, Input, OnInit, output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { HeaderComponent } from '../../dialog/header/header.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { MemberUpdateCommand } from '../../../model/commands/member-update-command';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';
import { MemberCommandService } from '../../../services/backend/command/member-command.service';
import { MemberResponse } from '../../../model/responses/member-response';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'config-edit-member',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    TextEntryComponent,
    BodyComponent,
    DialogComponent,
    ExplanationComponent,
    HeaderComponent,
    FooterComponent,
    SubmitComponent,
    CancelComponent,
  ],
  templateUrl: './edit-member.component.html',
})
export class EditMemberComponent implements OnInit {
  memberIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  model = new MemberUpdateCommand();

  private editResponse$ = new BehaviorSubject<MemberResponse | null>(null);

  constructor(
    private memberRequestService: MemberRequestService,
    private memberCommandService: MemberCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  observeEditResponse(): Observable<MemberResponse | null> {
    return this.editResponse$.asObservable();
  }

  ngOnInit() {
    this.startObservingEditResponse();
    this.startObservingMemberIdInput();
  }

  private startObservingEditResponse() {
    this.observeEditResponse().subscribe((response) => {
      this.model.setup(response);
    });
  }

  private startObservingMemberIdInput() {
    this.memberIdObservableInput().subscribe((memberId) => {
      if (memberId !== null) {
        this.memberRequestService
          .find(memberId)
          .then((response) => this.editResponse$.next(response))
          .catch((error) => this.errorHandlerService.handle(error));
      } else {
        this.editResponse$.next(null);
      }
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const last = this.editResponse$.getValue();
      if (last) {
        this.memberCommandService
          .update(last.id, this.model)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
