import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DetectorService } from './setup/detector/detector.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { OnceComponent } from './setup/once/once.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, OnceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DetectorService],
})
export class AppComponent {
  title = 'onvp-frontend';

  constructor(
    protected setupDetector: DetectorService,
    protected router: Router,
    private route: ActivatedRoute,
  ) {
    if (route.component != OnceComponent) {
      this.setupDetector.shouldSetup().then((should) => {
        if (should) {
          router.navigate(['setup-once']).then((_) => {});
        }
      });
    }
  }
}
