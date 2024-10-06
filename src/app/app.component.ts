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
