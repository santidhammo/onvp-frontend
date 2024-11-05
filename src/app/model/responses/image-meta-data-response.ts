import { Role } from '../../generic/primitive/role';

export interface ImageMetaDataResponse {
  id: number;
  title: string;
  asset: string;
  roles: Role[];
}
