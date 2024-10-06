import { Component, Input, output } from '@angular/core';
import { MemberWithDetailModel } from '../member-with-detail-model';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormsModule, FormSubmittedEvent } from '@angular/forms';
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
export class EditMemberComponent {
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
   * Starts editing a member, also displays the form to edit the member
   *
   * @param memberId The id of the member to edit, the component will download the details of the member
   */
  @Input()
  set editMemberId(memberId: number | null) {
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
    this.editMemberId = null;
  }
}
