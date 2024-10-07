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

import { Component, Input, OnInit, output } from '@angular/core';
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
  public onSaved = output();
  model = new MemberUpdateCommand();

  private editMemberWithDetail$ = new BehaviorSubject<MemberResponse | null>(
    null,
  );

  constructor(
    private memberRequestService: MemberRequestService,
    private memberCommandService: MemberCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.observeEditMember().subscribe((memberResponse) => {
      this.model.setup(memberResponse);
    });
  }

  observeEditMember(): Observable<MemberResponse | null> {
    return this.editMemberWithDetail$.asObservable();
  }

  /**
   * Sets the member id of the member to edit and displays the dialog
   *
   * If the value is set to a valid member identifier, the member will be received from the backend and on success,
   * the dialog to edit the member will be displayed. If set to null, the dialog will be hidden.
   *
   * @param memberId The id of the member to edit, the component will download the details of the member
   */
  @Input()
  set memberId(memberId: number | null) {
    if (memberId !== null) {
      this.memberRequestService
        .find(memberId)
        .then((memberWithDetail: MemberResponse | null) =>
          this.editMemberWithDetail$.next(memberWithDetail),
        )
        .catch(this.errorHandlerService.handle);
    } else {
      this.editMemberWithDetail$.next(null);
    }
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const last = this.editMemberWithDetail$.getValue();
      if (last) {
        this.memberCommandService
          .update(last.id, this.model)
          .then(this.onSaved.emit)
          .catch(this.errorHandlerService.handle);
      }
    }
    this.memberId = null;
  }
}
