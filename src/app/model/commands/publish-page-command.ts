import { Role } from '../../generic/primitive/role';

export class PublishPageCommand {
  constructor(public roles: Role[]) {}
}
