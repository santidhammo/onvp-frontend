import { AddressRegisterSubCommand } from '../sub_commands/address-register-sub-command';
import { DetailRegisterSubCommand } from '../sub_commands/detail-register-sub-command';

export class MemberRegistrationCommand {
  constructor(
    public detailRegisterSubCommand: DetailRegisterSubCommand = new DetailRegisterSubCommand(),
    public addressRegisterSubCommand: AddressRegisterSubCommand = new AddressRegisterSubCommand(),
  ) {}
}
