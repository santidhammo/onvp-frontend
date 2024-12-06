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

import { Component, input, Input, OnInit, output } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { HeaderComponent } from '../../dialog/header/header.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { MemberUpdateCommand } from '../../../model/commands/member-update-command';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';
import { MemberCommandService } from '../../../services/backend/command/member-command.service';
import { MemberResponse } from '../../../model/responses/member-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkgroupResponse } from '../../../model/responses/workgroup-response';
import { WorkgroupRequestService } from '../../../services/backend/request/workgroup-request.service';
import { InputType } from '../../../generic/primitive/input-type';
import { MusicalInstrumentResponse } from '../../../model/responses/musical-instrument-response';
import { SearchResult } from '../../../model/search/search-result';
import { MusicalInstrumentRequestService } from '../../../services/backend/request/musical-instrument-request.service';

@Component({
  selector: 'config-edit-member',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    TextEntryComponent,
    BodyComponent,
    DialogComponent,
    ExplanationComponent,
    HeaderComponent,
    FooterComponent,
    SubmitComponent,
    CancelComponent,
    NgForOf,
    NgClass,
  ],
  templateUrl: './edit-member.component.html',
})
export class EditMemberComponent implements OnInit {
  memberIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  protected model = new MemberUpdateCommand();

  private editResponse$ = new BehaviorSubject<MemberResponse | null>(null);
  private editWorkgroupResponses$ = new BehaviorSubject<WorkgroupResponse[]>(
    [],
  );

  protected musicalInstrumentNameQuery: string = '';

  private musicalInstrumentPage$ = new BehaviorSubject<number | null>(null);
  private musicalInstrumentRows$ = new BehaviorSubject<
    MusicalInstrumentResponse[]
  >([]);
  private musicalInstrumentSearchResult$ =
    new BehaviorSubject<SearchResult<MusicalInstrumentResponse> | null>(null);
  protected musicalInstrumentName: string | null = null;

  constructor(
    private memberRequestService: MemberRequestService,
    private memberCommandService: MemberCommandService,
    private musicalInstrumentRequestService: MusicalInstrumentRequestService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observeEditResponse(): Observable<MemberResponse | null> {
    return this.editResponse$.asObservable();
  }

  get observeWorkgroupResponses(): Observable<WorkgroupResponse[]> {
    return this.editWorkgroupResponses$.asObservable();
  }

  get observeMusicalInstrumentSearchResult(): Observable<SearchResult<MusicalInstrumentResponse> | null> {
    return this.musicalInstrumentSearchResult$.asObservable();
  }

  get observeMusicalInstrumentRows(): Observable<MusicalInstrumentResponse[]> {
    return this.musicalInstrumentRows$.asObservable();
  }

  ngOnInit() {
    this.startObservingEditResponse();
    this.startObservingMemberIdInput();
  }

  private startObservingEditResponse() {
    this.observeEditResponse.subscribe((response) => {
      this.model.setup(response);
    });
  }

  private startObservingMemberIdInput() {
    this.memberIdObservableInput().subscribe((memberId) => {
      if (memberId !== null) {
        this.memberRequestService
          .find(memberId)
          .then((response) => {
            this.memberRequestService
              .findWorkgroups(memberId)
              .then((workgroupResponses) => {
                this.musicalInstrumentName = null;
                this.editResponse$.next(response);
                this.editWorkgroupResponses$.next(workgroupResponses);

                if (response.musicalInstrumentId) {
                  this.musicalInstrumentRequestService
                    .find(response.musicalInstrumentId)
                    .then((musicalInstrumentResponse) => {
                      this.musicalInstrumentName =
                        musicalInstrumentResponse.name;
                    })
                    .catch((error) => this.errorHandlerService.handle(error));
                }
              })
              .catch((error) => this.errorHandlerService.handle(error));
          })
          .catch((error) => this.errorHandlerService.handle(error));
      } else {
        this.editResponse$.next(null);
      }
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const last = this.editResponse$.getValue();
      if (last) {
        this.memberCommandService
          .update(last.id, this.model)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }

  doMusicalInstrumentSearch(pageNumber: number = 1) {
    this.musicalInstrumentRequestService
      .search(this.musicalInstrumentNameQuery, pageNumber - 1)
      .then((result) => {
        let page = result.pageOffset + 1;
        this.musicalInstrumentPage$.next(page);
        this.musicalInstrumentRows$.next(result.rows);
        this.musicalInstrumentSearchResult$.next(result);
      })
      .catch((e) => {
        this.errorHandlerService.handle(e);
      });
  }

  protected readonly InputType = InputType;

  setMusicalInstrument(
    musicalInstrumentId: number,
    musicalInstrumentName: string,
  ) {
    this.model.musicalInstrumentId = musicalInstrumentId;
    this.musicalInstrumentName = musicalInstrumentName;
    this.musicalInstrumentPage$.next(null);
    this.musicalInstrumentRows$.next([]);
    this.musicalInstrumentSearchResult$.next(null);
  }

  deleteMusicalInstrument() {
    this.model.musicalInstrumentId = null;
    this.musicalInstrumentName = null;
  }
}
