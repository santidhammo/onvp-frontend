import { Component, input, output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { WorkgroupUpdateCommand } from '../../../model/commands/workgroup-update-command';
import { WorkgroupResponse } from '../../../model/responses/workgroup-response';
import { WorkgroupRequestService } from '../../../services/backend/request/workgroup-request.service';
import { WorkgroupCommandService } from '../../../services/backend/command/workgroup-command.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';

@Component({
  selector: 'config-edit-workgroup',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    CancelComponent,
    DialogComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    NgIf,
    SubmitComponent,
    TextEntryComponent,
  ],
  templateUrl: './edit-workgroup.component.html',
})
export class EditWorkgroupComponent {
  workgroupIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  model = new WorkgroupUpdateCommand();

  private editResponse$ = new BehaviorSubject<WorkgroupResponse | null>(null);

  constructor(
    private workgroupRequestService: WorkgroupRequestService,
    private workgroupCommandService: WorkgroupCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  observeEditResponse(): Observable<WorkgroupResponse | null> {
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
    this.workgroupIdObservableInput().subscribe((memberId) => {
      if (memberId !== null) {
        this.workgroupRequestService
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
        this.workgroupCommandService
          .update(last.id, this.model)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
