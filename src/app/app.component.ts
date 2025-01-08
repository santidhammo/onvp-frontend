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
import { BehaviorSubject, Observable } from 'rxjs';
import { PageRequestService } from './services/backend/request/page-request.service';
import { PageResponse } from './model/responses/page-response';
import { MediaLibraryComponent } from './ckeditor5/components/media-library/media-library.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe,
    MenuBarComponent,
    HeaderComponent,
    ExplanationComponent,
    FormsModule,
    FooterComponent,
    SubmitComponent,
    MediaLibraryComponent,
  ],
  templateUrl: './app.component.html',
  providers: [SetupRequestService],
})
export class AppComponent implements OnInit {
  title = 'onvp-frontend';
  private functionalCookiesAllowed$ = new BehaviorSubject(false);

  constructor(
    protected setupDetector: SetupRequestService,
    protected authorizationRequestService: AuthorizationRequestService,
    protected errorHandlerService: ErrorHandlerService,
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

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.errorHandlerService.clearError();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.authorizationRequestService.startRefresh();
    if (window.localStorage.getItem('allow-functional-cookies')) {
      this.functionalCookiesAllowed$.next(true);
    }
  }

  get observeFunctionalCookiesAllowed(): Observable<boolean> {
    return this.functionalCookiesAllowed$.asObservable();
  }

  clearErrorMaybeRetry() {
    this.errorHandlerService.clearError();
    window.location.reload();
  }

  allowFunctionalCookies() {
    window.localStorage.setItem('allow-functional-cookies', 'true');
    this.functionalCookiesAllowed$.next(true);
  }
}
