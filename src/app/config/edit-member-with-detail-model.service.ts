import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MembersService } from './members.service';
import { MemberWithDetail } from '../interfaces/member-with-detail';
import { MemberWithDetailModel } from './member-with-detail-model';

@Injectable({
  providedIn: 'root',
})
export class EditMemberWithDetailModelService {
  constructor(private membersService: MembersService) {}

  private editMemberWithDetail$ = new BehaviorSubject<MemberWithDetail | null>(
    null,
  );

  startEditMember(memberId: number): void {
    this.membersService
      .getMemberWithDetailByIdAsync(memberId)
      .then((memberWithDetail: MemberWithDetail | null) =>
        this.editMemberWithDetail$.next(memberWithDetail),
      );
  }

  stopEditMember() {
    this.editMemberWithDetail$.next(null);
  }

  observeEditMember(): Observable<MemberWithDetail | null> {
    return this.editMemberWithDetail$.asObservable();
  }

  async save(data: MemberWithDetailModel): Promise<void> {
    const last = this.editMemberWithDetail$.getValue();
    if (last) {
      const modified = { ...last };
      modified.emailAddress = data.emailAddress;
      modified.phoneNumber = data.phoneNumber;
      modified.firstName = data.firstName;
      modified.lastName = data.lastName;
      modified.musicalInstrumentId = data.musicalInstrumentId;
      modified.pictureAssetId = data.pictureAssetId;

      try {
        await this.membersService.saveMember(modified);
      } catch (error) {
      } finally {
        this.stopEditMember();
      }
    }
  }
}
