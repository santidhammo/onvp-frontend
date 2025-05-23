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
import { BehaviorSubject, Observable } from 'rxjs';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';
import { MemberCommandService } from '../../../services/backend/command/member-command.service';

@Component({
  selector: 'config-edit-member-picture',
  standalone: true,
  imports: [
    BodyComponent,
    CancelComponent,
    DialogComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    SubmitComponent,
    TextEntryComponent,
    AsyncPipe,
    NgOptimizedImage,
    NgIf,
  ],
  templateUrl: './edit-member-picture.component.html',
})
export class EditMemberPictureComponent implements OnInit {
  memberIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  pictureUrl$ = new BehaviorSubject<string | null>(null);
  memberId$ = new BehaviorSubject<number | null>(null);
  selectedFile: File | null = null;

  constructor(
    private memberRequestService: MemberRequestService,
    private memberCommandService: MemberCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observePictureUrl(): Observable<string | null> {
    return this.pictureUrl$.asObservable();
  }

  get observeMemberId(): Observable<number | null> {
    return this.memberId$.asObservable();
  }

  ngOnInit() {
    this.startObservingMemberIdInput();
  }

  private startObservingMemberIdInput() {
    this.memberIdObservableInput().subscribe((memberId) => {
      if (memberId !== null) {
        this.memberRequestService
          .picture(memberId)
          .then((imageAssetIdResponse) => {
            this.memberId$.next(memberId);
            if (imageAssetIdResponse.assetId !== null) {
              this.pictureUrl$.next(
                `/api/members/v1/${memberId}/picture.png?${imageAssetIdResponse.assetId}`,
              );
            } else {
              this.pictureUrl$.next(null);
            }
          })
          .catch((error) => this.errorHandlerService.handle(error));
      } else {
        this.memberId$.next(null);
        this.pictureUrl$.next(null);
      }
    });
  }

  async submit(event: SubmitEvent): Promise<void> {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const memberId = this.memberId$.value;
      if (this.selectedFile !== null && memberId !== null) {
        try {
          await this.memberCommandService.savePictureAsset(
            this.selectedFile,
            memberId,
          );
          this.onSaved.emit();
        } catch (error) {
          this.errorHandlerService.handle(error);
        }
      }
    } else {
      this.onCancelled.emit();
    }
  }

  onPictureSelected($event: Event) {
    if ($event.target !== null) {
      const target = $event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.selectedFile = target.files[0];
      }
    }
  }
}
