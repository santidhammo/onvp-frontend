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

import { Component, OnInit } from '@angular/core';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';
import { BehaviorSubject, last, Observable } from 'rxjs';
import { MemberResponse } from '../../../model/responses/member-response';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavigatorPage } from '../../../model/search/navigator-page';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { EditMemberPictureComponent } from '../edit-member-picture/edit-member-picture.component';
import { ConfigRegisterMemberComponent } from '../config-register-member/config-register-member.component';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { SearchResult } from '../../../model/search/search-result';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { EditMemberAddressComponent } from '../edit-member-address/edit-member-address.component';

@Component({
  selector: 'config-members',
  standalone: true,
  imports: [
    TextEntryComponent,
    FormsModule,
    SubmitComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgClass,
    RouterLink,
    EditMemberComponent,
    EditMemberPictureComponent,
    ConfigRegisterMemberComponent,
    PaginatorComponent,
    EditMemberAddressComponent,
  ],
  templateUrl: './member-details.component.html',
})
export class MemberDetailsComponent implements OnInit {
  // private totalCount$ = new BehaviorSubject<number | null>(null);
  private page$ = new BehaviorSubject<number | null>(null);
  // private pageCount$ = new BehaviorSubject<number>(0);
  private rows$ = new BehaviorSubject<MemberResponse[]>([]);
  // private navigatorPages$ = new BehaviorSubject<NavigatorPage[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<MemberResponse> | null>(null);

  protected editMemberId$ = new BehaviorSubject<number | null>(null);
  protected editAddressMemberId$ = new BehaviorSubject<number | null>(null);
  protected editPictureMemberId$ = new BehaviorSubject<number | null>(null);
  protected registerEnabled$ = new BehaviorSubject<boolean>(false);

  nameQuery: string = '';

  constructor(
    private memberService: MemberRequestService,
    private requestErrorHandlerService: ErrorHandlerService,
  ) {}
  ngOnInit() {
    this.doSearch();
  }

  get observeSearchResult(): Observable<SearchResult<MemberResponse> | null> {
    return this.searchResult$.asObservable();
  }

  observeRows(): Observable<MemberResponse[]> {
    return this.rows$.asObservable();
  }

  refreshSearch() {
    const lastPage = this.page$.getValue();
    if (lastPage !== null) {
      this.doSearch(lastPage);
    } else {
      this.doSearch();
    }
  }

  doSearch(pageNumber: number = 1) {
    this.memberService
      .search(this.nameQuery, pageNumber - 1)
      .then((result) => {
        let page = result.pageOffset + 1;
        this.page$.next(page);
        this.rows$.next(result.rows);
        this.searchResult$.next(result);
      })
      .catch(this.requestErrorHandlerService.handle);
  }
}
