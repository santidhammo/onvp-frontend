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
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { Role } from '../../../generic/primitive/role';
import { ImageMetaDataResponse } from '../../../model/responses/image-meta-data-response';
import { PublishImageCommand } from '../../../model/commands/publish-image-command';
import { ImageRequestService } from '../../../services/backend/request/image-request.service';
import { ImageCommandService } from '../../../services/backend/command/image-command.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { InputType } from '../../../generic/primitive/input-type';

@Component({
  selector: 'config-image-publication',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    CancelComponent,
    DialogComponent,
    ExplanationComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    NgIf,
    ReactiveFormsModule,
    SubmitComponent,
    TextEntryComponent,
  ],
  templateUrl: './image-publication.component.html',
})
export class ImagePublicationComponent implements OnInit {
  imageIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  model = new ImagePublicationModel();

  private response$ = new BehaviorSubject<ImageMetaDataResponse | null>(null);

  constructor(
    private imageRequestService: ImageRequestService,
    private imageCommandService: ImageCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observeResponse(): Observable<ImageMetaDataResponse | null> {
    return this.response$.asObservable();
  }

  ngOnInit() {
    this.imageIdObservableInput().subscribe(async (pageId: number | null) => {
      if (pageId) {
        const response = await this.imageRequestService.find(pageId);
        this.response$.next(response);
      } else {
        this.response$.next(null);
      }
    });

    this.response$.subscribe((response: ImageMetaDataResponse | null) => {
      this.model.setup(response);
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const last = this.response$.getValue();
      if (last) {
        if (this.model.shouldUnpublish()) {
          this.imageCommandService
            .unpublish(last.id)
            .then(() => this.onSaved.emit())
            .catch((error) => this.errorHandlerService.handle(error));
        } else {
          const command = this.model.makePublishCommand();
          this.imageCommandService
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

class ImagePublicationModel {
  constructor(
    public memberRole: boolean = false,
    public publicRole: boolean = false,
    public orchestraCommitteeRole: boolean = false,
  ) {}
  public setup(response: ImageMetaDataResponse | null | undefined) {
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

  makePublishCommand(): PublishImageCommand {
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
    return new PublishImageCommand(newRoles);
  }
}
