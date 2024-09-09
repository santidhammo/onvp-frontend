import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DetectorService } from './setup/detector/detector.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { OnceComponent } from './setup/once/once.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginService } from './security/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, OnceComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  providers: [DetectorService],
})
export class AppComponent {
  title = 'onvp-frontend';

  constructor(
    protected setupDetector: DetectorService,
    protected loginService: LoginService,
    protected router: Router,
    private route: ActivatedRoute,
  ) {
    if (route.component != OnceComponent) {
      this.setupDetector.shouldSetup().then((should) => {
        if (should) {
          router.navigate(['setup']).then((_) => {});
        }
      });
    }

    this.loginService.testLogin().finally(null);
    setInterval(() => this.loginService.testLogin().finally(null), 60000);
  }
}
