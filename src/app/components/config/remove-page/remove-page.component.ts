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
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { PageCommandService } from '../../../services/backend/command/page-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';

@Component({
  selector: 'config-remove-page',
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
  ],
  templateUrl: './remove-page.component.html',
  styles: ``,
})
export class RemovePageComponent implements OnInit {
  pageIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  private id$ = new BehaviorSubject<number | null>(null);
  private title$ = new BehaviorSubject<string | null>(null);

  constructor(
    private pageRequestService: PageRequestService,
    private pageCommandService: PageCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.startObservingPageIdInput();
  }

  observeTitle(): Observable<string | null> {
    return this.title$.asObservable();
  }

  private startObservingPageIdInput() {
    this.pageIdObservableInput().subscribe((pageId) => {
      if (pageId !== null) {
        this.pageRequestService
          .find(pageId)
          .then((response) => {
            this.title$.next(response.title);
            this.id$.next(response.id);
          })
          .catch((error) => this.errorHandlerService.handle(error));
      } else {
        this.title$.next(null);
      }
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const lastId = this.id$.getValue();
      if (lastId) {
        this.pageCommandService
          .delete(lastId)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
