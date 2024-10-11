import { Component, input, OnInit, output } from '@angular/core';
import { WorkgroupCommandService } from '../../../services/backend/command/workgroup-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { Observable } from 'rxjs';
import { WorkgroupRegisterCommand } from '../../../model/commands/workgroup-register-command';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';

@Component({
  selector: 'config-register-workgroup',
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
    SubmitComponent,
    TextEntryComponent,
  ],
  templateUrl: './register-workgroup.component.html',
})
export class RegisterWorkgroupComponent implements OnInit {
  constructor(
    private workgroupCommandService: WorkgroupCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  enabledInput = input.required<Observable<boolean>>();
  onSaved = output();
  onCancelled = output();
  model = new WorkgroupRegisterCommand();

  ngOnInit() {
    this.enabledInput().subscribe((enabled) => {
      if (!enabled) {
        this.model = new WorkgroupRegisterCommand();
      }
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      this.workgroupCommandService
        .register(this.model)
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
