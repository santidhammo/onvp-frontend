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

import { RoleClass } from './role-class';

export enum Role {
  PUBLIC = 'PUBLIC',
  MEMBER = 'MEMBER',
  ORCHESTRA_COMMITTEE = 'ORCHESTRA_COMMITTEE',
  OPERATOR = 'OPERATOR',
}

export namespace Role {
  export function getTitle(role: Role) {
    switch (role) {
      case Role.MEMBER:
        return $localize`Member`;
      case Role.ORCHESTRA_COMMITTEE:
        return $localize`Orchestra Committee`;
      case Role.OPERATOR:
        return $localize`Operator`;
      case Role.PUBLIC:
        return $localize`Public Access`;
    }
  }
}
