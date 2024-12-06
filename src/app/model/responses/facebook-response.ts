import { Role } from '../../generic/primitive/role';

export interface FacebookResponse {
  id: number;
  musicalInstrumentName: string | null;
  musicalInstrumentUrl: string | null;
  pictureAssetId: string | null;
  fullName: string;
  description: string | null;
  workgroupNames: string[];
  roles: Role[];
}
