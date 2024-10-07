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

import { Routes } from '@angular/router';
import { ActivationComponent } from './components/route/activation/activation.component';
import { SetupDetectorComponent } from './components/setup/setup-detector.component';
import { LoginComponent } from './components/route/login/login.component';
import { LogoutComponent } from './components/route/logout/logout.component';
import { ConfigComponent } from './components/route/config/config.component';

export const routes: Routes = [
  { path: 'activation/:activationString', component: ActivationComponent },
  { path: 'setup', component: SetupDetectorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'config', component: ConfigComponent },
];
