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
  ],
  templateUrl: './member-details.component.html',
})
export class MemberDetailsComponent implements OnInit {
  private totalCount$ = new BehaviorSubject<number | null>(null);
  private page$ = new BehaviorSubject<number | null>(null);
  private pageCount$ = new BehaviorSubject<number>(0);
  private rows$ = new BehaviorSubject<MemberResponse[]>([]);
  private navigatorPages$ = new BehaviorSubject<NavigatorPage[]>([]);

  nameQuery: string = '';
  editMemberId: number | null = null;
  editPictureMemberId: number | null = null;
  enableMemberRegistration: boolean = false;

  constructor(
    private memberService: MemberRequestService,
    private requestErrorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.doSearch();
  }

  observeTotalCount(): Observable<number | null> {
    return this.totalCount$.asObservable();
  }

  observePage(): Observable<number | null> {
    return this.page$.asObservable();
  }

  observePageCount(): Observable<number> {
    return this.pageCount$.asObservable();
  }

  observeRows(): Observable<MemberResponse[]> {
    return this.rows$.asObservable();
  }

  observeNavigatorPages(): Observable<NavigatorPage[]> {
    return this.navigatorPages$.asObservable();
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
        this.pageCount$.next(result.pageCount);
        this.totalCount$.next(result.totalCount);
        this.rows$.next(result.rows);

        const startPage = Math.max(1, page - 5);
        const endPage = Math.min(page + 5, result.pageCount);
        let navigator = [];
        for (let i = startPage; i <= endPage; i++) {
          navigator.push(
            new NavigatorPage(i, i === page, i === startPage, i === endPage),
          );
        }
        this.navigatorPages$.next(navigator);
      })
      .catch(this.requestErrorHandlerService.handle);
  }
}
