/*
 *  ONVP Frontend - Frontend of the ONVP website
 *
 * Copyright (c) 2024.  Sjoerd van Leent
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Component, input, OnInit, output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UpdatePageCommand } from '../../../model/commands/update-page-command';
import { PageResponse } from '../../../model/responses/page-response';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { PageCommandService } from '../../../services/backend/command/page-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { HeaderComponent } from '../../dialog/header/header.component';
import { FormsModule } from '@angular/forms';
import { BodyComponent } from '../../dialog/body/body.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { EventDateEntryComponent } from '../../form/event-date-entry/event-date-entry.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';

@Component({
  selector: 'config-edit-page-details',
  standalone: true,
  imports: [
    DialogComponent,
    NgIf,
    AsyncPipe,
    HeaderComponent,
    FormsModule,
    BodyComponent,
    TextEntryComponent,
    EventDateEntryComponent,
    CancelComponent,
    FooterComponent,
    SubmitComponent,
  ],
  templateUrl: './edit-page-details.component.html',
  styles: ``,
})
export class EditPageDetailsComponent implements OnInit {
  pageIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  protected model = new UpdatePageCommand();

  private editResponse$ = new BehaviorSubject<PageResponse | null>(null);

  constructor(
    private pageRequestService: PageRequestService,
    private pageCommandService: PageCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observeEditResponse(): Observable<PageResponse | null> {
    return this.editResponse$.asObservable();
  }

  ngOnInit() {
    this.startObservingEditResponse();
    this.startObservingPageIdInput();
  }

  private startObservingEditResponse() {
    this.observeEditResponse.subscribe((response) => {
      this.model.setup(response);
    });
  }

  private startObservingPageIdInput() {
    this.pageIdObservableInput().subscribe((pageId) => {
      if (pageId) {
        this.pageRequestService
          .find(pageId)
          .then((response) => {
            this.editResponse$.next(response);
          })
          .catch((error) => {
            this.errorHandlerService.handle(error);
          });
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
        this.pageCommandService
          .update(last.id, this.model)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
