import { Role } from '../../generic/primitive/role';
import { RoleClass } from '../../generic/primitive/role-class';

export class AssociateRoleCommand {
  constructor(
    public id: number = 0,
    public role: Role = Role.PUBLIC,
    public roleClass: RoleClass = RoleClass.MEMBER,
  ) {}
}
