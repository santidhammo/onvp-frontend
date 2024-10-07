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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { MemberActivationCommand } from '../../../model/commands/member-activation-command';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';

@Component({
  selector: 'route-activation',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    DialogComponent,
    ExplanationComponent,
    FormsModule,
    HeaderComponent,
    TextEntryComponent,
    FooterComponent,
    SubmitComponent,
  ],
  templateUrl: './activation.component.html',
})
export class ActivationComponent implements OnInit {
  protected model: MemberActivationCommand = new MemberActivationCommand();
  private activationBase64PngSource = new BehaviorSubject<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestErrorHandlerService: ErrorHandlerService,
    private memberRequestService: MemberRequestService,
  ) {}

  ngOnInit() {
    firstValueFrom(this.route.paramMap).then(async (params) => {
      const activationString = String(params.get('activationString'));
      try {
        const pngData =
          await this.memberRequestService.activation_code(activationString);
        this.model.activationString = activationString;
        this.activationBase64PngSource.next(pngData);
      } catch (error) {
        await this.router.navigate(['']);
        this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      }
    });
  }

  public observeActivationBase64Png(): Observable<string> {
    return this.activationBase64PngSource.asObservable();
  }

  submit() {
    this.memberRequestService
      .activate(this.model)
      .then((_) => {
        this.router.navigate(['']).finally(null);
      })
      .catch(this.requestErrorHandlerService.handle);
  }
}
