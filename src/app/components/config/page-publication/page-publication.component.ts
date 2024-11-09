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

import { Component, input, OnInit, output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExtendedPageResponse } from '../../../model/responses/extended-page-response';
import { Role } from '../../../generic/primitive/role';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { PageCommandService } from '../../../services/backend/command/page-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { PublishPageCommand } from '../../../model/commands/publish-page-command';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { InputType } from '../../../generic/primitive/input-type';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';

@Component({
  selector: 'config-page-publication',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    DialogComponent,
    FormsModule,
    HeaderComponent,
    CancelComponent,
    FooterComponent,
    SubmitComponent,
    NgIf,
    TextEntryComponent,
    ExplanationComponent,
  ],
  templateUrl: './page-publication.component.html',
})
export class PagePublicationComponent implements OnInit {
  pageIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  model = new PagePublicationModel();

  private response$ = new BehaviorSubject<ExtendedPageResponse | null>(null);

  constructor(
    private pageRequestService: PageRequestService,
    private pageCommandService: PageCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observeResponse(): Observable<ExtendedPageResponse | null> {
    return this.response$.asObservable();
  }

  ngOnInit() {
    this.pageIdObservableInput().subscribe(async (pageId: number | null) => {
      if (pageId) {
        const extendedPage = await this.pageRequestService.find(pageId);
        this.response$.next(extendedPage);
      } else {
        this.response$.next(null);
      }
    });

    this.response$.subscribe((response: ExtendedPageResponse | null) => {
      this.model.setup(response);
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const last = this.response$.getValue();
      if (last) {
        if (this.model.shouldUnpublish()) {
          this.pageCommandService
            .unpublish(last.id)
            .then(() => this.onSaved.emit())
            .catch((error) => this.errorHandlerService.handle(error));
        } else {
          const command = this.model.makePublishCommand();
          this.pageCommandService
            .publish(last.id, command)
            .then(() => this.onSaved.emit())
            .catch((error) => this.errorHandlerService.handle(error));
        }
      }
    } else {
      this.onCancelled.emit();
    }
  }

  protected readonly InputType = InputType;
}

class PagePublicationModel {
  constructor(
    public memberRole: boolean = false,
    public publicRole: boolean = false,
    public orchestraCommitteeRole: boolean = false,
  ) {}
  public setup(response: ExtendedPageResponse | null | undefined) {
    if (response) {
      for (let role of response.roles) {
        switch (role) {
          case Role.PUBLIC:
            this.publicRole = true;
            break;
          case Role.ORCHESTRA_COMMITTEE:
            this.orchestraCommitteeRole = true;
            break;
          case Role.MEMBER:
            this.memberRole = true;
            break;
          default:
        }
      }
    } else {
      this.memberRole = false;
      this.publicRole = false;
      this.orchestraCommitteeRole = false;
    }
  }

  public shouldUnpublish() {
    return !this.memberRole && !this.publicRole && !this.orchestraCommitteeRole;
  }

  makePublishCommand(): PublishPageCommand {
    let newRoles = new Array<Role>();
    if (this.memberRole) {
      newRoles.push(Role.MEMBER);
    }
    if (this.orchestraCommitteeRole) {
      newRoles.push(Role.ORCHESTRA_COMMITTEE);
    }
    if (this.publicRole) {
      newRoles.push(Role.PUBLIC);
    }
    return new PublishPageCommand(newRoles);
  }
}
