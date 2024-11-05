import { Role } from '../../generic/primitive/role';

export class PublishImageCommand {
  constructor(public roles: Role[]) {}
}
