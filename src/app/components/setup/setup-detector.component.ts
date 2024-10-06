import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstOperatorRegisterCommand } from '../../model/commands/first-operator-register-command';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../dialog/header/header.component';
import { ExplanationComponent } from '../dialog/explanation/explanation.component';
import { TextEntryComponent } from '../form/text-entry/text-entry.component';
import { DialogComponent } from '../dialog/dialog.component';
import { BodyComponent } from '../dialog/body/body.component';
import { FooterComponent } from '../dialog/footer/footer.component';
import { SubmitComponent } from '../form/submit/submit.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SetupRequestService } from '../../services/backend/request/setup-request.service';
import { SetupCommandService } from '../../services/backend/command/setup-command.service';
import { ErrorHandlerService } from '../../services/handlers/error-handler.service';

@Component({
  selector: 'setup-once',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HeaderComponent,
    ExplanationComponent,
    TextEntryComponent,
    DialogComponent,
    BodyComponent,
    FooterComponent,
    SubmitComponent,
  ],
  templateUrl: './setup-detector.component.html',
})
export class SetupDetectorComponent {
  model = new FirstOperatorRegisterCommand();

  constructor(
    private http: HttpClient,
    private router: Router,
    protected setupDetectorService: SetupRequestService,
    protected setupCommandService: SetupCommandService,
    protected errorHandlerService: ErrorHandlerService,
  ) {
    setupDetectorService.shouldSetup().then((shouldSetup) => {
      if (!shouldSetup) {
        router.navigate(['']).then((_) => {});
      }
    });
  }

  onSubmit() {
    this.setupCommandService
      .setupFirstOperator(this.model)
      .then((activationString) => {
        this.router
          .navigate([`activation/${activationString}`])
          .then((_) => {});
      })
      .catch((reason) => {
        this.errorHandlerService.handle(reason);
      });
  }
}
