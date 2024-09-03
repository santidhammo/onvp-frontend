import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DetectorService} from "./setup/detector/detector.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {OnceComponent} from "./setup/once/once.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, OnceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DetectorService]
})
export class AppComponent {
  title = 'onvp-frontend';
  protected shouldSetup: Promise<boolean>;

  constructor(protected setupDetector: DetectorService) {
    this.shouldSetup = this.setupDetector.shouldSetup();
  }

}
