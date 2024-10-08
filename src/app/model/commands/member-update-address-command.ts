/*
 *  ONVP Frontend - Frontend of the ONVP website
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

import { MemberAddressResponse } from '../responses/member-address-response';

export class MemberUpdateAddressCommand {
  constructor(
    public street: string = '',
    public houseNumber: number = 0,
    public houseNumberPostfix: string = '',
    public postalCode: string = '',
    public domicile: string = '',
  ) {}

  setup(response: MemberAddressResponse | null) {
    if (response !== null) {
      this.street = response.street;
      this.houseNumber = response.houseNumber;
      this.houseNumberPostfix = response.houseNumberPostfix;
      this.postalCode = response.postalCode;
      this.domicile = response.domicile;
    } else {
      this.street = '';
      this.houseNumber = 0;
      this.houseNumberPostfix = '';
      this.postalCode = '';
      this.domicile = '';
    }
  }
}
