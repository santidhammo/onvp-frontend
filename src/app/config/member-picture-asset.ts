export class MemberPictureAsset {
  constructor(
    public memberId: number,
    public assetId: string | null,
    public pictureUrl: string | null,
  ) {}
}
