import { MemberPrivacyInfoSharingResponse } from '../responses/member-privacy-info-sharing-response';

export class MemberUpdatePrivacyInfoSharingCommand {
  constructor(public allow: boolean = false) {}

  setup(response: MemberPrivacyInfoSharingResponse | null) {
    if (response) {
      this.allow = response.allow;
    } else {
      this.allow = false;
    }
  }
}
