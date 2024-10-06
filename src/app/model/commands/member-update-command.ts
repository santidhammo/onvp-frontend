import { MemberResponse } from '../responses/member-response';

export class MemberUpdateCommand {
  constructor(
    public musicalInstrumentId: number | null = null,
    public firstName: string = '',
    public lastName: string = '',
    public emailAddress: string = '',
    public phoneNumber: string = '',
  ) {}

  setup(memberWithDetail: MemberResponse | null) {
    if (memberWithDetail) {
      this.musicalInstrumentId = memberWithDetail.musicalInstrumentId;
      this.firstName = memberWithDetail.firstName;
      this.lastName = memberWithDetail.lastName;
      this.emailAddress = memberWithDetail.emailAddress;
      this.phoneNumber = memberWithDetail.phoneNumber;
    } else {
      this.musicalInstrumentId = null;
      this.firstName = '';
      this.lastName = '';
      this.emailAddress = '';
      this.phoneNumber = '';
    }
  }
}
