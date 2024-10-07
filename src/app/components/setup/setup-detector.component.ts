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

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstOperatorRegisterCommand } from '../../model/commands/first-operator-register-command';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../dialog/header/header.component';
import { ExplanationComponent } from '../dialog/explanation/explanation.component';
import { TextEntryComponent } from '../form/text-entry/text-entry.component';
import { DialogComponent } from '../dialog/dialog.component';
import { BodyComponent } from '../dialog/body/body.component';
import { FooterComponent } from '../dialog/footer/footer.component';
import { SubmitComponent } from '../form/submit/submit.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SetupRequestService } from '../../services/backend/request/setup-request.service';
import { SetupCommandService } from '../../services/backend/command/setup-command.service';
import { ErrorHandlerService } from '../../services/handlers/error-handler.service';

@Component({
  selector: 'setup-once',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HeaderComponent,
    ExplanationComponent,
    TextEntryComponent,
    DialogComponent,
    BodyComponent,
    FooterComponent,
    SubmitComponent,
  ],
  templateUrl: './setup-detector.component.html',
})
export class SetupDetectorComponent {
  model = new FirstOperatorRegisterCommand();

  constructor(
    private http: HttpClient,
    private router: Router,
    protected setupDetectorService: SetupRequestService,
    protected setupCommandService: SetupCommandService,
    protected errorHandlerService: ErrorHandlerService,
  ) {
    setupDetectorService.shouldSetup().then((shouldSetup) => {
      if (!shouldSetup) {
        router.navigate(['']).then((_) => {});
      }
    });
  }

  onSubmit() {
    this.setupCommandService
      .setupFirstOperator(this.model)
      .then((activationString) => {
        this.router
          .navigate([`activation/${activationString}`])
          .then((_) => {});
      })
      .catch((reason) => {
        this.errorHandlerService.handle(reason);
      });
  }
}
