import { Component, output } from '@angular/core';
import { MemberRegistrationService } from '../member-registration.service';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { MemberWithDetailModel } from '../member-with-detail-model';
import { MemberRegistrationDataModel } from '../member-registration-data-model';
import { CancelComponent } from '../../form/cancel/cancel.component';

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
  ],
  templateUrl: './config-register-member.component.html',
})
export class ConfigRegisterMemberComponent {
  constructor(protected registerMemberService: MemberRegistrationService) {}

  onSaved = output();
  model = MemberRegistrationDataModel.createEmpty();

  ngOnInit() {
    this.registerMemberService
      .observeRegistrationEnabled()
      .subscribe((enabled) => {
        if (!enabled) {
          this.model = MemberRegistrationDataModel.createEmpty();
        }
      });
  }

  async onSubmit(event: SubmitEvent): Promise<void> {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name === 'cancel') {
    } else {
      await this.registerMemberService.registerMember(this.model);
      this.onSaved.emit();
    }
    this.registerMemberService.stopRegistration();
  }
}
