import { Component, output } from '@angular/core';
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
import { EditMemberWithDetailModelService } from '../edit-member-with-detail-model.service';
import { CancelComponent } from '../../form/cancel/cancel.component';

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
  model = new MemberWithDetailModel();

  constructor(
    private editMemberWithDetailModelService: EditMemberWithDetailModelService,
  ) {
    this.editMemberWithDetailModelService
      .observeEditMember()
      .subscribe((memberWithDetail) => {
        this.model.setup(memberWithDetail);
      });
  }

  async submit(event: SubmitEvent): Promise<void> {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name === 'cancel') {
      this.editMemberWithDetailModelService.stopEdit();
    } else {
      await this.editMemberWithDetailModelService.save(this.model);
      this.onSaved.emit();
    }
  }
}
