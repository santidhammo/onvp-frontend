export interface MemberResponse {
  id: number;
  musicalInstrumentId: number | null;
  pictureAssetId: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  activated: boolean;
}
