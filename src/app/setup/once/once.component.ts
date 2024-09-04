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
  onSubmit() {
    console.log(this.model);
  }
}
