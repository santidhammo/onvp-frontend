import { Component, input, output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { WorkgroupRequestService } from '../../../services/backend/request/workgroup-request.service';
import { WorkgroupCommandService } from '../../../services/backend/command/workgroup-command.service';

@Component({
  selector: 'config-unregister-workgroup',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    CancelComponent,
    DialogComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    SubmitComponent,
    NgIf,
  ],
  templateUrl: './unregister-workgroup.component.html',
})
export class UnregisterWorkgroupComponent {
  workgroupIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  private id$ = new BehaviorSubject<number | null>(null);
  private name$ = new BehaviorSubject<string | null>(null);

  constructor(
    private workgroupRequestService: WorkgroupRequestService,
    private workgroupCommandService: WorkgroupCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.startObservingMemberIdInput();
  }

  observeName(): Observable<string | null> {
    return this.name$.asObservable();
  }

  private startObservingMemberIdInput() {
    this.workgroupIdObservableInput().subscribe((workgroupId) => {
      if (workgroupId !== null) {
        this.workgroupRequestService
          .find(workgroupId)
          .then((response) => {
            this.name$.next(response.name);
            this.id$.next(response.id);
          })
          .catch((error) => this.errorHandlerService.handle(error));
      } else {
        this.name$.next(null);
      }
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const lastId = this.id$.getValue();
      if (lastId) {
        this.workgroupCommandService
          .delete(lastId)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
