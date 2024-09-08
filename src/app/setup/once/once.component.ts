import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstOperator } from './first-operator';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../dialog/header/header.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { BodyComponent } from '../../dialog/body/body.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DetectorService } from '../detector/detector.service';

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
  templateUrl: './once.component.html',
  styleUrl: './once.component.css',
})
export class OnceComponent {
  model = FirstOperator.createEmpty();

  constructor(
    private http: HttpClient,
    private router: Router,
    protected setupDetector: DetectorService,
  ) {
    setupDetector.shouldSetup().then((shouldSetup) => {
      if (!shouldSetup) {
        router.navigate(['']).then((_) => {});
      }
    });
  }

  async setupAndAwaitActivationString(): Promise<string> {
    const data = await firstValueFrom(
      this.http.post('/api/setup/setup_first_operator', this.model),
    );
    return data.toString();
  }

  onSubmit() {
    this.setupAndAwaitActivationString().then((activationString) => {
      this.router.navigate([`activation/${activationString}`]).then((_) => {});
    });
  }
}
