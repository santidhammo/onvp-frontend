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

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../../../model/search/search-result';
import { WorkgroupResponse } from '../../../model/responses/workgroup-response';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { WorkgroupRequestService } from '../../../services/backend/request/workgroup-request.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { RegisterMemberComponent } from '../register-member/register-member.component';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { RegisterWorkgroupComponent } from '../register-workgroup/register-workgroup.component';
import { EditWorkgroupComponent } from '../edit-workgroup/edit-workgroup.component';
import { UnregisterMemberComponent } from '../unregister-member/unregister-member.component';
import { UnregisterWorkgroupComponent } from '../unregister-workgroup/unregister-workgroup.component';

@Component({
  selector: 'config-workgroups',
  standalone: true,
  imports: [
    FormsModule,
    SubmitComponent,
    TextEntryComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    PaginatorComponent,
    RegisterMemberComponent,
    EditMemberComponent,
    RegisterWorkgroupComponent,
    EditWorkgroupComponent,
    UnregisterMemberComponent,
    UnregisterWorkgroupComponent,
  ],
  templateUrl: './workgroups.component.html',
})
export class WorkgroupsComponent {
  private page$ = new BehaviorSubject<number | null>(null);
  private rows$ = new BehaviorSubject<WorkgroupResponse[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<WorkgroupResponse> | null>(null);

  protected editWorkgroupId$ = new BehaviorSubject<number | null>(null);
  protected registerEnabled$ = new BehaviorSubject<boolean>(false);
  protected unregisterWorkgroupId$ = new BehaviorSubject<number | null>(null);

  nameQuery: string = '';

  constructor(
    private workgroupRequestService: WorkgroupRequestService,
    private requestErrorHandlerService: ErrorHandlerService,
  ) {}
  ngOnInit() {
    this.doSearch();
  }

  get observeSearchResult(): Observable<SearchResult<WorkgroupResponse> | null> {
    return this.searchResult$.asObservable();
  }

  observeRows(): Observable<WorkgroupResponse[]> {
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
    this.workgroupRequestService
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
