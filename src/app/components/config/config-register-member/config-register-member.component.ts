import { Component, output } from '@angular/core';
import { MemberRegistrationService } from '../../../services/member/member-registration.service';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { MemberWithDetailModel } from '../member-with-detail-model';
import { MemberRegistrationCommand } from '../../../model/commands/member-registration-command';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DetailRegisterSubCommand } from '../../../model/sub_commands/detail-register-sub-command';
import { AddressRegisterSubCommand } from '../../../model/sub_commands/address-register-sub-command';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';

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
  constructor(
    protected registerMemberService: MemberRegistrationService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  onSaved = output();
  model = this.createEmptyModel();

  ngOnInit() {
    this.registerMemberService
      .observeRegistrationEnabled()
      .subscribe((enabled) => {
        if (!enabled) {
          this.model = this.createEmptyModel();
        }
      });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      this.registerMemberService
        .registerMember(this.model)
        .then(this.onSaved.emit)
        .catch(this.errorHandlerService.handle);
    }
    this.registerMemberService.stopRegistration();
  }

  private createEmptyModel() {
    return new MemberRegistrationCommand(
      new DetailRegisterSubCommand('', '', '', ''),
      new AddressRegisterSubCommand('', 0, null, '', ''),
    );
  }
}
