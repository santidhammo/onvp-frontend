import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { MailTemplateNameResponse } from '../../../../../model/responses/mail-template-name-response';
import { ErrorHandlerService } from '../../../../../services/handlers/error-handler.service';
import { MailTemplateRequestService } from '../../../../../services/backend/request/mail-template-request.service';
import { map } from 'rxjs/operators';
import { WizardPaneComponent } from '../../../../wizard/wizard-pane.component';
import { Router } from '@angular/router';

@Component({
  selector: 'mailing-template-wizard',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    AsyncPipe,
    NgClass,
    WizardPaneComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './start.component.html',
  styles: ``,
})
export class StartComponent implements OnInit {
  private mail_template_names$ = new BehaviorSubject<
    MailTemplateNameResponse[]
  >([]);

  form = new FormGroup({
    action: new FormControl<Actions>(Actions.CREATE),
    updateSelection: new FormControl<string | null>({
      value: null,
      disabled: true,
    }),
    deleteSelection: new FormControl<string | null>({
      value: null,
      disabled: true,
    }),
  });

  constructor(
    private mailTemplateRequestService: MailTemplateRequestService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      let listing = await this.mailTemplateRequestService.list();
      this.mail_template_names$.next(listing);
    } catch (error: any) {
      this.errorHandlerService.handle(error);
    }

    this.noItems.subscribe((noItems) => {
      if (!noItems) {
        this.form.controls.updateSelection.enable();
        this.form.controls.deleteSelection.enable();
      } else {
        this.form.controls.updateSelection.disable();
        this.form.controls.deleteSelection.disable();
      }
    });
  }

  protected get items(): Observable<MailTemplateNameResponse[]> {
    return this.mail_template_names$.asObservable();
  }

  protected get noItems(): Observable<boolean> {
    return this.mail_template_names$.pipe(
      map((listing: MailTemplateNameResponse[]) => listing.length == 0),
    );
  }

  next() {
    console.log(this.form.value);
  }

  async cancel() {
    try {
      await this.router.navigateByUrl('/mailing');
    } catch (error: any) {
      this.errorHandlerService.handle(error);
    }
  }

  protected Actions = Actions;
}

enum Actions {
  CREATE,
  UPDATE,
  DELETE,
}
