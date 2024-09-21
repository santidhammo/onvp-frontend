import { Injectable } from '@angular/core';
import { MembersService } from './members.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberWithDetail } from '../interfaces/member-with-detail';
import { MemberPictureAsset } from './member-picture-asset';

@Injectable({
  providedIn: 'root',
})
export class EditMemberPictureService {
  constructor(private membersService: MembersService) {}

  private editMemberPicture$ = new BehaviorSubject<MemberPictureAsset | null>(
    null,
  );

  startEdit(memberId: number) {
    this.membersService
      .getMemberPictureAssetIdAsync(memberId)
      .then((assetId) => {
        this.editMemberPicture$.next(
          new MemberPictureAsset(
            memberId,
            assetId,
            `/api/members/member_picture/${memberId}.png?${assetId}`,
          ),
        );
      });
  }

  stopEdit() {
    this.editMemberPicture$.next(null);
  }

  observeEditMemberId(): Observable<MemberPictureAsset | null> {
    return this.editMemberPicture$.asObservable();
  }

  async save(file: File) {
    const memberId = this.editMemberPicture$.getValue()?.memberId;
    if (memberId !== null && memberId !== undefined) {
      await this.membersService.savePictureAsset(file, memberId);
    }
    this.stopEdit();
  }
}
