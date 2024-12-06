import { Component, OnInit } from '@angular/core';
import { FacebookRequestService } from '../../../services/backend/request/facebook-request.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../../../model/search/search-result';
import { FacebookResponse } from '../../../model/responses/facebook-response';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Role } from '../../../generic/primitive/role';
import { MusicalInstrumentRequestService } from '../../../services/backend/request/musical-instrument-request.service';

@Component({
  selector: 'config-facebook',
  standalone: true,
  imports: [
    FormsModule,
    SubmitComponent,
    TextEntryComponent,
    PaginatorComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgOptimizedImage,
  ],
  templateUrl: './facebook.component.html',
})
export class FacebookComponent implements OnInit {
  private page$ = new BehaviorSubject<number | null>(null);
  private rows$ = new BehaviorSubject<FacebookResponse[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<FacebookResponse> | null>(null);
  protected nameQuery = '';

  constructor(
    public facebookRequestService: FacebookRequestService,
    public errorHandlerService: ErrorHandlerService,
  ) {}
  ngOnInit(): void {
    this.doSearch();
  }

  get observeSearchResult(): Observable<SearchResult<FacebookResponse> | null> {
    return this.searchResult$.asObservable();
  }

  get observeRows(): Observable<FacebookResponse[]> {
    return this.rows$.asObservable();
  }

  doSearch(pageNumber: number = 1) {
    this.facebookRequestService
      .search(this.nameQuery, pageNumber - 1)
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

  getFacebookPictureAsset(memberId: number, pictureAssetId: string): string {
    return `/api/facebook/v1/${memberId}/picture.png?${pictureAssetId}`;
  }

  getFacebookPictureAlt(fullName: string): string {
    return $localize`Picture of ${fullName}`;
  }

  protected readonly Role = Role;
}
