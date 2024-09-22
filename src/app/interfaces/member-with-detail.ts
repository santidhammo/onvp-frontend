export interface MemberWithDetail {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  activated: boolean;
  musicalInstrumentId: number | null;
  pictureAssetId: string | null;
}