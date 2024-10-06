import { MemberResponse } from './member-response';
import { Role } from '../../generic/primitive/role';

export interface AuthorizationResponse {
  member: MemberResponse;
  compositeRoles: Role[];
}
