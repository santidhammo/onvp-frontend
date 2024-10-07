/*
 *  ONVP Backend - Backend API provider for the ONVP website
 *
 * Copyright (c) 2024.  Sjoerd van Leent
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { MemberResponse } from '../responses/member-response';

export class MemberUpdateCommand {
  constructor(
    public musicalInstrumentId: number | null = null,
    public firstName: string = '',
    public lastName: string = '',
    public emailAddress: string = '',
    public phoneNumber: string = '',
  ) {}

  setup(memberResponse: MemberResponse | null) {
    if (memberResponse) {
      this.musicalInstrumentId = memberResponse.musicalInstrumentId;
      this.firstName = memberResponse.firstName;
      this.lastName = memberResponse.lastName;
      this.emailAddress = memberResponse.emailAddress;
      this.phoneNumber = memberResponse.phoneNumber;
    } else {
      this.musicalInstrumentId = null;
      this.firstName = '';
      this.lastName = '';
      this.emailAddress = '';
      this.phoneNumber = '';
    }
  }
}
