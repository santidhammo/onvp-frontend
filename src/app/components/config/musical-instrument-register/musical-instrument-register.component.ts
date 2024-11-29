import { Component, input, OnInit, output } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterMusicalInstrumentCommand } from '../../../model/commands/register-musical-instrument-command';
import { MusicalInstrumentCommandService } from '../../../services/backend/command/musical-instrument-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';

@Component({
  selector: 'config-musical-instrument-register',
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
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
  ],
  templateUrl: './musical-instrument-register.component.html',
  styles: ``,
})
export class MusicalInstrumentRegisterComponent implements OnInit {
  enabledInput = input.required<Observable<boolean>>();
  onSaved = output();
  onCancelled = output();
  protected model = new RegisterMusicalInstrumentCommand();

  constructor(
    private musicalInstrumentCommandService: MusicalInstrumentCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observeEnabledInput(): Observable<boolean> {
    return this.enabledInput();
  }

  ngOnInit(): void {
    this.observeEnabledInput.subscribe((enabled) => {
      if (enabled) {
        this.model = new RegisterMusicalInstrumentCommand();
      }
    });
  }

  async submit(event: SubmitEvent): Promise<void> {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      try {
        await this.musicalInstrumentCommandService.register(this.model);
        this.onSaved.emit();
      } catch (error) {
        this.errorHandlerService.handle(error);
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
