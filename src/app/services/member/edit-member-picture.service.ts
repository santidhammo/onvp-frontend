import { Injectable } from '@angular/core';
import { MemberRequestService } from '../backend/request/member-request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberResponse } from '../../model/responses/member-response';
import { MemberPictureAsset } from '../../components/config/member-picture-asset';
import { MemberCommandService } from '../backend/command/member-command.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditMemberPictureService {
  constructor(
    private memberRequestService: MemberRequestService,
    private memberCommandService: MemberCommandService,
  ) {}

  private editMemberPicture$ = new BehaviorSubject<MemberPictureAsset | null>(
    null,
  );

  startEdit(memberId: number) {
    this.memberRequestService.picture(memberId).then((imageAssetIdResponse) => {
      if (imageAssetIdResponse.assetId !== null) {
        this.editMemberPicture$.next(
          new MemberPictureAsset(
            memberId,
            imageAssetIdResponse.assetId,
            `/api/members/member_picture/${memberId}.png?${imageAssetIdResponse}`,
          ),
        );
      } else {
        this.editMemberPicture$.next(null);
      }
    });
  }

  stopEdit() {
    this.editMemberPicture$.next(null);
  }

  observeEditMemberPictureAsset(): Observable<MemberPictureAsset | null> {
    return this.editMemberPicture$.asObservable();
  }

  async save(file: File) {
    const memberId = this.editMemberPicture$.getValue()?.memberId;
    if (memberId !== null && memberId !== undefined) {
      await this.memberCommandService.savePictureAsset(file, memberId);
    }
    this.stopEdit();
  }
}
