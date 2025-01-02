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
import { FacebookComponent } from './components/route/facebook/facebook.component';
import { PageEditorComponent } from './components/route/page-editor/page-editor.component';
import { PageComponent } from './components/route/page/page.component';
import { StartComponent as MailTemplateWizardStartComponent } from './components/route/mailing/template-wizard/start/start.component';
import { CreateComponent as MailTemplateWizardCreateComponent } from './components/route/mailing/template-wizard/create/create.component';
import { UpdateComponent as MailTemplateWizardUpdateComponent } from './components/route/mailing/template-wizard/update/update.component';
import { DeleteComponent as MailTemplateWizardDeleteComponent } from './components/route/mailing/template-wizard/delete/delete.component';
import { StartComponent as MailWizardStartComponent } from './components/route/mailing/wizard/start/start.component';
import { MainComponent as MailingMainComponent } from './components/route/mailing/main/main.component';

export const routes: Routes = [
  { path: 'activation/:activationString', component: ActivationComponent },
  { path: 'setup', component: SetupDetectorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'facebook', component: FacebookComponent },
  { path: 'edit-page/:id', component: PageEditorComponent },
  { path: 'mailing', component: MailingMainComponent },
  {
    path: 'mail/template-wizard/start',
    component: MailTemplateWizardStartComponent,
  },
  {
    path: 'mail/template-wizard/create',
    component: MailTemplateWizardCreateComponent,
  },
  {
    path: 'mail/template-wizard/update/:id',
    component: MailTemplateWizardUpdateComponent,
  },
  {
    path: 'mail/template-wizard/delete/:id',
    component: MailTemplateWizardDeleteComponent,
  },
  {
    path: 'mail/wizard/start',
    component: MailWizardStartComponent,
  },
  { path: '', component: PageComponent },
];
