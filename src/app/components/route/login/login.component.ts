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

import { Component } from '@angular/core';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { AuthorizationRequest } from '../../../model/requests/authorization-request';
import { SubmitComponent } from '../../form/submit/submit.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthorizationRequestService } from '../../../services/backend/request/authorization-request.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BodyComponent,
    DialogComponent,
    ExplanationComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    TextEntryComponent,
    SubmitComponent,
    NgIf,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  model = new AuthorizationRequest();
  loginFailed: boolean = false;

  constructor(
    private router: Router,
    private loginService: AuthorizationRequestService,
  ) {}

  onSubmit() {
    this.loginService
      .login(this.model)
      .then((_) => {
        this.router.navigate(['']).then((_) => {});
      })
      .catch((_) => {
        this.loginFailed = true;
      });
  }
}
