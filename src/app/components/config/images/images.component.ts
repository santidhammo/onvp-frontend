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
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../../../model/search/search-result';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { ImageMetaDataResponse } from '../../../model/responses/image-meta-data-response';
import { ImageRequestService } from '../../../services/backend/request/image-request.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { CreatePageComponent } from '../create-page/create-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagePublicationComponent } from '../page-publication/page-publication.component';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { ImagePublicationComponent } from '../image-publication/image-publication.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'config-images',
  standalone: true,
  imports: [
    AsyncPipe,
    CreatePageComponent,
    FormsModule,
    NgForOf,
    NgIf,
    PagePublicationComponent,
    PaginatorComponent,
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
    ImagePublicationComponent,
    ImageUploadComponent,
  ],
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit {
  private image$ = new BehaviorSubject<number | null>(null);
  private rows$ = new BehaviorSubject<ImageMetaDataResponse[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<ImageMetaDataResponse> | null>(null);

  protected uploadEnabled$ = new BehaviorSubject<boolean>(false);

  protected publicationImageId$ = new BehaviorSubject<number | null>(null);

  protected titleQuery: string = '';

  constructor(
    private imageRequestService: ImageRequestService,
    private errorHandlerService: ErrorHandlerService,
  ) {}
  ngOnInit() {
    this.doSearch();
  }

  get observeSearchResult(): Observable<SearchResult<ImageMetaDataResponse> | null> {
    return this.searchResult$.asObservable();
  }

  get observeRows(): Observable<ImageMetaDataResponse[]> {
    return this.rows$.asObservable();
  }

  refreshSearch() {
    const lastPage = this.image$.getValue();
    if (lastPage !== null) {
      this.doSearch(lastPage);
    } else {
      this.doSearch();
    }
  }

  doSearch(pageNumber: number = 1) {
    this.imageRequestService
      .search(this.titleQuery, pageNumber - 1)
      .then((result) => {
        let page = result.pageOffset + 1;
        this.image$.next(page);
        this.rows$.next(result.rows);
        this.searchResult$.next(result);
      })
      .catch((e) => {
        this.errorHandlerService.handle(e);
      });
  }
}
