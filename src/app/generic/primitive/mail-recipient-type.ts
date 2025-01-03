/*
 *  ONVP Frontend - Frontend of the ONVP website
 *
 * Copyright (c) 2025.  Sjoerd van Leent
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

export enum MailRecipientType {
  MEMBER = 'MEMBER',
  WORKGROUP = 'WORKGROUP',
  MUSICAL_INSTRUMENT = 'MUSICAL_INSTRUMENT',
}

export namespace MailRecipientType {
  export function getName(mailRecipientType: MailRecipientType) {
    switch (mailRecipientType) {
      case MailRecipientType.MEMBER:
        return $localize`Member`;
      case MailRecipientType.WORKGROUP:
        return $localize`Work group`;
      case MailRecipientType.MUSICAL_INSTRUMENT:
        return $localize`Musical instrument`;
    }
  }
}
