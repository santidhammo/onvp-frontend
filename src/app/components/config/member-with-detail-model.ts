import { MemberResponse } from '../../model/responses/member-response';

export class MemberWithDetailModel {
  firstName!: string;
  lastName!: string;
  emailAddress!: string;
  phoneNumber!: string;
  musicalInstrumentId!: number | null;
  pictureAssetId!: string | null;

  constructor() {
    this.setup(null);
  }

  setup(data: MemberResponse | null) {
    if (data === null) {
      this.firstName = '';
      this.lastName = '';
      this.emailAddress = '';
      this.phoneNumber = '';
      this.musicalInstrumentId = null;
      this.pictureAssetId = null;
    } else {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.emailAddress = data.emailAddress;
      this.phoneNumber = data.phoneNumber;
      this.musicalInstrumentId = data.musicalInstrumentId;
      this.pictureAssetId = data.pictureAssetId;
    }
  }
}
