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
import { WizardPaneComponent } from '../../../../wizard/wizard-pane.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitComponent } from '../../../../form/submit/submit.component';
import { TextEntryComponent } from '../../../../form/text-entry/text-entry.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { MemberResponse } from '../../../../../model/responses/member-response';
import { SearchResult } from '../../../../../model/search/search-result';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../../services/handlers/error-handler.service';
import { MemberRequestService } from '../../../../../services/backend/request/member-request.service';
import { PaginatorComponent } from '../../../../search/paginator/paginator.component';
import { SendMailCommand } from '../../../../../model/commands/send-mail-command';
import { MailRecipientType } from '../../../../../generic/primitive/mail-recipient-type';
import { MailingCommandService } from '../../../../../services/backend/command/mailing-command.service';

@Component({
  standalone: true,
  imports: [
    WizardPaneComponent,
    FormsModule,
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    PaginatorComponent,
    NgClass,
  ],
  templateUrl: './member-recipient.component.html',
  styles: ``,
})
export class MemberRecipientComponent implements OnInit {
  // The template identifier
  private templateId: number | null = null;

  // The subject to use
  private subject: string | null = null;

  // Source subject to determine whether the finish button should be enabled
  private enableFinish$ = new BehaviorSubject<boolean>(false);

  // Source of the amount of pages available as members page
  private page$ = new BehaviorSubject<number | null>(null);

  // Source of the member rows for the current page
  private rows$ = new BehaviorSubject<MemberResponse[]>([]);

  // Source of the member direct search result of the members
  private searchResult$ =
    new BehaviorSubject<SearchResult<MemberResponse> | null>(null);

  // Source of the currently selected member id to use to send the email to
  private selectedMemberId$ = new BehaviorSubject<number | null>(null);

  // The name of the member to query on, this could be the first name, last name or email address of the member
  nameQuery = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private memberRequestService: MemberRequestService,
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
    this.selectedMemberId$.subscribe((memberId) => {
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
  protected get observeRows(): Observable<MemberResponse[]> {
    return this.rows$.asObservable();
  }

  // Returns an observable interface of the search result
  protected get observeSearchResult(): Observable<SearchResult<MemberResponse> | null> {
    return this.searchResult$.asObservable();
  }
  // Return an observable interface to the currently selected member
  protected get observeSelectedMember(): Observable<number | null> {
    return this.selectedMemberId$.asObservable();
  }

  // Toggles the selected member id to the given member id
  protected toggleSelectedMember(memberId: number) {
    this.selectedMemberId$.next(memberId);
  }

  // Searches for the members, if a page number is given, the result will contain members within that page.
  async doSearch(pageNumber: number = 1) {
    this.selectedMemberId$.next(null);
    try {
      const result = await this.memberRequestService.search(
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
    const memberId = this.selectedMemberId$.value;
    if (memberId && this.templateId && this.subject) {
      try {
        const command = new SendMailCommand(
          this.templateId,
          this.subject,
          MailRecipientType.MEMBER,
          memberId,
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
