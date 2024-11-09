import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegisterMemberComponent } from '../register-member/register-member.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../../../model/search/search-result';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { PageResponse } from '../../../model/responses/page-response';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { CreatePageComponent } from '../create-page/create-page.component';
import { PagePublicationComponent } from '../page-publication/page-publication.component';

@Component({
  selector: 'config-pages',
  standalone: true,
  imports: [
    FormsModule,
    PaginatorComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgClass,
    RouterLink,
    RegisterMemberComponent,
    TextEntryComponent,
    SubmitComponent,
    CreatePageComponent,
    PagePublicationComponent,
  ],
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  private page$ = new BehaviorSubject<number | null>(null);
  private rows$ = new BehaviorSubject<PageResponse[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<PageResponse> | null>(null);

  protected createEnabled$ = new BehaviorSubject<boolean>(false);

  protected publicationPageId$ = new BehaviorSubject<number | null>(null);

  protected titleQuery: string = '';

  constructor(
    private pageRequestService: PageRequestService,
    private errorHandlerService: ErrorHandlerService,
  ) {}
  ngOnInit() {
    this.doSearch();
  }

  get observeSearchResult(): Observable<SearchResult<PageResponse> | null> {
    return this.searchResult$.asObservable();
  }

  get observeRows(): Observable<PageResponse[]> {
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
    this.pageRequestService
      .search(this.titleQuery, pageNumber - 1)
      .then((result) => {
        let page = result.pageOffset + 1;
        this.page$.next(page);
        this.rows$.next(result.rows);
        this.searchResult$.next(result);
      })
      .catch((e) => {
        this.errorHandlerService.handle(e);
      });
  }
}
