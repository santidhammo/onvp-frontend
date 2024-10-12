import { Role } from '../../generic/primitive/role';
import { RoleClass } from '../../generic/primitive/role-class';

export class RoleClassComposition {
  constructor(
    public roleClass: RoleClass,
    public id: number,
    public name: string,
    public roles: Role[],
  ) {}

  hasRole(role: Role): boolean {
    return this.roles.includes(role);
  }
}
