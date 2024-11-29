import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MusicalInstrumentResponse } from '../../../model/responses/musical-instrument-response';
import { SearchResult } from '../../../model/search/search-result';
import { MusicalInstrumentRequestService } from '../../../services/backend/request/musical-instrument-request.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { FormsModule } from '@angular/forms';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ImagePublicationComponent } from '../image-publication/image-publication.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { MusicalInstrumentRegisterComponent } from '../musical-instrument-register/musical-instrument-register.component';
import { MusicalInstrumentEditComponent } from '../musical-instrument-edit/musical-instrument-edit.component';

@Component({
  selector: 'config-musical-instruments',
  standalone: true,
  imports: [
    FormsModule,
    TextEntryComponent,
    SubmitComponent,
    AsyncPipe,
    ImagePublicationComponent,
    ImageUploadComponent,
    NgForOf,
    NgIf,
    PaginatorComponent,
    MusicalInstrumentRegisterComponent,
    MusicalInstrumentEditComponent,
  ],
  templateUrl: './musical-instruments.component.html',
  styles: ``,
})
export class MusicalInstrumentsComponent implements OnInit {
  private page$ = new BehaviorSubject<number | null>(null);
  private rows$ = new BehaviorSubject<MusicalInstrumentResponse[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<MusicalInstrumentResponse> | null>(null);

  protected registerEnabled$ = new BehaviorSubject<boolean>(false);

  protected editMusicalInstrumentId$ = new BehaviorSubject<number | null>(null);

  protected nameQuery: string = '';

  constructor(
    private musicalInstrumentRequestService: MusicalInstrumentRequestService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.doSearch();
  }

  get observeSearchResult(): Observable<SearchResult<MusicalInstrumentResponse> | null> {
    return this.searchResult$.asObservable();
  }

  get observeRows(): Observable<MusicalInstrumentResponse[]> {
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
    this.musicalInstrumentRequestService
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
}
