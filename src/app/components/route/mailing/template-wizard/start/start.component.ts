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
  private mailTemplateNames = new BehaviorSubject<MailTemplateNameResponse[]>(
    [],
  );

  private nextEnabled$ = new BehaviorSubject<boolean>(true);

  form = new FormGroup({
    action: new FormControl<Actions>(Actions.CREATE),
    updateSelection: new FormControl<number | null>({
      value: null,
      disabled: true,
    }),
    deleteSelection: new FormControl<number | null>({
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
      this.mailTemplateNames.next(listing);
    } catch (error: any) {
      this.errorHandlerService.handle(error);
    }

    this.observeHasNoItems.subscribe((noItems) => {
      if (!noItems) {
        this.form.controls.updateSelection.enable();
        this.form.controls.deleteSelection.enable();
      } else {
        this.form.controls.updateSelection.disable();
        this.form.controls.deleteSelection.disable();
      }
    });
  }

  protected get observeItems(): Observable<MailTemplateNameResponse[]> {
    return this.mailTemplateNames.asObservable();
  }

  protected get observeHasNoItems(): Observable<boolean> {
    return this.mailTemplateNames.pipe(
      map((listing: MailTemplateNameResponse[]) => listing.length == 0),
    );
  }

  protected get observeNextEnabled(): Observable<boolean> {
    return this.nextEnabled$.asObservable();
  }

  async next() {
    const action = this.form.controls.action.value;
    if (action !== null) {
      try {
        switch (action) {
          case Actions.CREATE:
            await this.router.navigateByUrl('/mail/template-wizard/create');
            break;
          case Actions.UPDATE:
            const updateSelection = this.form.controls.updateSelection.value;
            if (updateSelection) {
              await this.router.navigateByUrl(
                '/mail/template-wizard/update/' + updateSelection,
              );
            }
            break;
          case Actions.DELETE:
            const deleteSelection = this.form.controls.deleteSelection.value;
            if (deleteSelection) {
              await this.router.navigateByUrl(
                '/mail/template-wizard/delete/' + deleteSelection,
              );
            }
            break;
        }
      } catch (error: any) {
        this.errorHandlerService.handle(error);
      }
    }
  }

  async cancel() {
    try {
      await this.router.navigateByUrl('/mailing');
    } catch (error: any) {
      this.errorHandlerService.handle(error);
    }
  }

  protected Actions = Actions;

  evaluateNextButton() {
    const enableNext =
      this.form.controls.action.value === Actions.CREATE ||
      (this.form.controls.action.value === Actions.UPDATE &&
        this.form.controls.updateSelection.value !== null) ||
      (this.form.controls.action.value === Actions.DELETE &&
        this.form.controls.deleteSelection.value !== null);
    this.nextEnabled$.next(enableNext);
  }
}

enum Actions {
  CREATE,
  UPDATE,
  DELETE,
}
