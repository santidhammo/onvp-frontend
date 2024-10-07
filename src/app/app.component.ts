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
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SetupRequestService } from './services/backend/request/setup-request.service';
import { AsyncPipe, Location, NgForOf, NgIf } from '@angular/common';
import { SetupDetectorComponent } from './components/setup/setup-detector.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { AuthorizationRequestService } from './services/backend/request/authorization-request.service';
import { ErrorHandlerService } from './services/handlers/error-handler.service';
import { HeaderComponent } from './components/dialog/header/header.component';
import { ExplanationComponent } from './components/dialog/explanation/explanation.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/dialog/footer/footer.component';
import { SubmitComponent } from './components/form/submit/submit.component';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe,
    SetupDetectorComponent,
    MenuBarComponent,
    NgForOf,
    HeaderComponent,
    ExplanationComponent,
    FormsModule,
    FooterComponent,
    SubmitComponent,
    DialogComponent,
  ],
  templateUrl: './app.component.html',
  providers: [SetupRequestService],
})
export class AppComponent {
  title = 'onvp-frontend';

  constructor(
    protected setupDetector: SetupRequestService,
    protected authorizationRequestService: AuthorizationRequestService,
    protected requestErrorHandlerService: ErrorHandlerService,
    protected router: Router,
    protected route: ActivatedRoute,
  ) {
    if (route.component != SetupDetectorComponent) {
      this.setupDetector.shouldSetup().then((should) => {
        if (should) {
          router.navigate(['setup']).then((_) => {});
        }
      });
    }

    this.authorizationRequestService.refresh().finally(null);
    setInterval(
      () => this.authorizationRequestService.refresh().finally(null),
      60000,
    );

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.requestErrorHandlerService.clearError();
      }
    });
  }

  clearErrorMaybeRetry() {
    this.requestErrorHandlerService.clearError();
    window.location.reload();
  }
}
