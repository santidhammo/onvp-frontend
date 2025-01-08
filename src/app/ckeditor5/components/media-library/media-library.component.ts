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

import { Component, OnInit, output } from '@angular/core';
import { MediaLibraryService } from '../../services/media-library.service';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { DialogSize } from '../../../generic/primitive/dialog-size';
import { HeaderComponent } from '../../../components/dialog/header/header.component';
import { ExplanationComponent } from '../../../components/dialog/explanation/explanation.component';
import { BodyComponent } from '../../../components/dialog/body/body.component';
import { FooterComponent } from '../../../components/dialog/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitComponent } from '../../../components/form/submit/submit.component';
import { TextEntryComponent } from '../../../components/form/text-entry/text-entry.component';
import { PaginatorComponent } from '../../../components/search/paginator/paginator.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ImageRequestService } from '../../../services/backend/request/image-request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageMetaDataResponse } from '../../../model/responses/image-meta-data-response';
import { SearchResult } from '../../../model/search/search-result';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';

@Component({
  selector: 'ckeditor5-media-library',
  standalone: true,
  imports: [
    DialogComponent,
    HeaderComponent,
    ExplanationComponent,
    BodyComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
    PaginatorComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
  ],
  templateUrl: './media-library.component.html',
})
export class MediaLibraryComponent implements OnInit {
  private enabled$ = new BehaviorSubject<boolean>(false);
  private page$ = new BehaviorSubject<number | null>(null);
  private rows$ = new BehaviorSubject<ImageMetaDataResponse[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<ImageMetaDataResponse> | null>(null);
  protected titleQuery: string = '';

  constructor(
    public mediaLibraryService: MediaLibraryService,
    public imageRequestService: ImageRequestService,
    public errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.mediaLibraryService.observeMediaRequested.subscribe((value) => {
      if (value) {
        this.doSearch();
      }
      this.enabled$.next(value);
    });
  }

  get observeEnabled(): Observable<boolean> {
    return this.enabled$.asObservable();
  }

  get observeSearchResult(): Observable<SearchResult<ImageMetaDataResponse> | null> {
    return this.searchResult$.asObservable();
  }

  get observeRows(): Observable<ImageMetaDataResponse[]> {
    return this.rows$.asObservable();
  }

  doSearch(pageNumber: number = 1) {
    this.imageRequestService
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

  protected readonly DialogSize = DialogSize;

  cancel() {
    this.mediaLibraryService.cancelMediaUrl();
  }
}
