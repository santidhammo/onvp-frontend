/*
 *  ONVP Frontend - Frontend of the ONVP website
 *
 * Copyright (c) 2025.  Sjoerd van Leent
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

import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../../../search/paginator/paginator.component';
import { SubmitComponent } from '../../../../form/submit/submit.component';
import { TextEntryComponent } from '../../../../form/text-entry/text-entry.component';
import { WizardPaneComponent } from '../../../../wizard/wizard-pane.component';
import { MailRecipientType } from '../../../../../generic/primitive/mail-recipient-type';
import { SendMailCommand } from '../../../../../model/commands/send-mail-command';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../../services/handlers/error-handler.service';
import { MusicalInstrumentRequestService } from '../../../../../services/backend/request/musical-instrument-request.service';
import { MailingCommandService } from '../../../../../services/backend/command/mailing-command.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { SearchResult } from '../../../../../model/search/search-result';
import { MusicalInstrumentResponse } from '../../../../../model/responses/musical-instrument-response';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    PaginatorComponent,
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
    WizardPaneComponent,
    NgClass,
  ],
  templateUrl: './musical-instrument-recipient.component.html',
  styles: ``,
})
export class MusicalInstrumentRecipientComponent implements OnInit {
  // The template identifier
  private templateId: number | null = null;

  // The subject to use
  private subject: string | null = null;

  // Source subject to determine whether the finish button should be enabled
  private enableFinish$ = new BehaviorSubject<boolean>(false);

  // Source of the amount of pages available as work groups page
  private page$ = new BehaviorSubject<number | null>(null);

  // Source of the musical instrument rows for the current page
  private rows$ = new BehaviorSubject<MusicalInstrumentResponse[]>([]);

  // Source of the musical instrument direct search result of the work groups
  private searchResult$ =
    new BehaviorSubject<SearchResult<MusicalInstrumentResponse> | null>(null);

  // Source of the currently selected musical instrument id to use to send the email to
  private selectedMusicalInstrumentId$ = new BehaviorSubject<number | null>(
    null,
  );

  // The name of the musical instrument to query on, this could be the first name, last name or email address of the musical instrument
  nameQuery = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private workgroupRequestService: MusicalInstrumentRequestService,
    private mailingCommandService: MailingCommandService,
  ) {}

  async ngOnInit() {
    try {
      let params = await firstValueFrom(this.route.paramMap);
      let queryParams = await firstValueFrom(this.route.queryParamMap);
      this.templateId = parseInt(String(params.get('templateId')));
      this.subject = String(queryParams.get('subject'));
    } catch (error) {
      this.errorHandlerService.handle(error as HttpErrorResponse);
    }
    this.selectedMusicalInstrumentId$.subscribe((memberId) => {
      this.enableFinish$.next(memberId !== null);
    });
    await this.doSearch();
  }

  // Returns an observable interface to determine if the finish button is to be enabled, this is used by the
  // wizard pane.
  protected get observeEnableFinish(): Observable<boolean> {
    return this.enableFinish$.asObservable();
  }

  // Return an observable interface of the rows
  protected get observeRows(): Observable<MusicalInstrumentResponse[]> {
    return this.rows$.asObservable();
  }

  // Returns an observable interface of the search result
  protected get observeSearchResult(): Observable<SearchResult<MusicalInstrumentResponse> | null> {
    return this.searchResult$.asObservable();
  }
  // Return an observable interface to the currently selected musical instrument
  protected get observeSelectedMusicalInstrument(): Observable<number | null> {
    return this.selectedMusicalInstrumentId$.asObservable();
  }

  // Toggles the selected musical instrument id to the given musical instrument id
  protected toggleSelectedMusicalInstrument(memberId: number) {
    this.selectedMusicalInstrumentId$.next(memberId);
  }

  // Searches for the work groups, if a page number is given, the result will contain work groups within that page.
  async doSearch(pageNumber: number = 1) {
    this.selectedMusicalInstrumentId$.next(null);
    try {
      const result = await this.workgroupRequestService.search(
        this.nameQuery,
        pageNumber - 1,
      );
      let page = result.pageOffset + 1;
      this.page$.next(page);
      this.rows$.next(result.rows);
      this.searchResult$.next(result);
    } catch (error) {
      this.errorHandlerService.handle(error as HttpErrorResponse);
    }
  }

  async finish() {
    const musicalInstrumentId = this.selectedMusicalInstrumentId$.value;
    if (musicalInstrumentId && this.templateId && this.subject) {
      try {
        const command = new SendMailCommand(
          this.templateId,
          this.subject,
          MailRecipientType.MUSICAL_INSTRUMENT,
          musicalInstrumentId,
        );
        await this.mailingCommandService.send(command);
        await this.router.navigateByUrl('/mailing');
      } catch (error) {
        this.errorHandlerService.handle(error as HttpErrorResponse);
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
}
