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

import { Component, input, OnInit, output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { MusicalInstrumentCommandService } from '../../../services/backend/command/musical-instrument-command.service';
import { MusicalInstrumentRequestService } from '../../../services/backend/request/musical-instrument-request.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';

@Component({
  selector: 'config-unregister-musical-instrument',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    CancelComponent,
    DialogComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    SubmitComponent,
    NgIf,
  ],
  templateUrl: './unregister-musical-instrument.component.html',
  styles: ``,
})
export class UnregisterMusicalInstrumentComponent implements OnInit {
  musicalInstrumentIdObservableInput =
    input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  private id$ = new BehaviorSubject<number | null>(null);
  private name$ = new BehaviorSubject<string | null>(null);

  constructor(
    private musicalInstrumentRequestService: MusicalInstrumentRequestService,
    private musicalInstrumentCommandService: MusicalInstrumentCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.startObservingMusicalInstrumentIdInput();
  }

  observeName(): Observable<string | null> {
    return this.name$.asObservable();
  }

  private startObservingMusicalInstrumentIdInput() {
    this.musicalInstrumentIdObservableInput().subscribe(
      (musicalInstrumentId) => {
        if (musicalInstrumentId !== null) {
          this.musicalInstrumentRequestService
            .find(musicalInstrumentId)
            .then((response) => {
              this.name$.next(response.name);
              this.id$.next(response.id);
            })
            .catch((error) => this.errorHandlerService.handle(error));
        } else {
          this.name$.next(null);
        }
      },
    );
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const lastId = this.id$.getValue();
      if (lastId) {
        this.musicalInstrumentCommandService
          .delete(lastId)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
