import { Component, input, output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { UpdateMusicalInstrumentCommand } from '../../../model/commands/update-musical-instrument-command';
import { MusicalInstrumentResponse } from '../../../model/responses/musical-instrument-response';
import { MusicalInstrumentRequestService } from '../../../services/backend/request/musical-instrument-request.service';
import { MusicalInstrumentCommandService } from '../../../services/backend/command/musical-instrument-command.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';

@Component({
  selector: 'config-musical-instrument-edit',
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
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
  ],
  templateUrl: './musical-instrument-edit.component.html',
  styles: ``,
})
export class MusicalInstrumentEditComponent {
  musicalInstrumentIdObservableInput =
    input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  model = new UpdateMusicalInstrumentCommand();

  private editResponse$ = new BehaviorSubject<MusicalInstrumentResponse | null>(
    null,
  );

  constructor(
    private musicalInstrumentRequestService: MusicalInstrumentRequestService,
    private musicalInstrumentCommandService: MusicalInstrumentCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observeEditResponse(): Observable<MusicalInstrumentResponse | null> {
    return this.editResponse$.asObservable();
  }

  ngOnInit() {
    this.startObservingEditResponse();
    this.startObservingMusicalInstrumentIdInput();
  }

  private startObservingEditResponse() {
    this.observeEditResponse.subscribe((response) => {
      if (response) {
        this.model = new UpdateMusicalInstrumentCommand(
          response.name,
          response.wikipediaUrl,
        );
      } else {
        this.model = new UpdateMusicalInstrumentCommand();
      }
    });
  }

  private startObservingMusicalInstrumentIdInput() {
    this.musicalInstrumentIdObservableInput().subscribe((memberId) => {
      if (memberId !== null) {
        this.musicalInstrumentRequestService
          .find(memberId)
          .then((response) => {
            this.editResponse$.next(response);
          })
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
        this.musicalInstrumentCommandService
          .update(last.id, this.model)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
