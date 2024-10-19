export interface FacebookResponse {
  id: number;
  musicalInstrumentId: number | null;
  pictureAssetId: string | null;
  fullName: string;
  description: string | null;
  workgroupNames: string[];
}
