import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirstOperator } from './first-operator';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../dialog/header/header.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';

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
  ],
  templateUrl: './once.component.html',
  styleUrl: './once.component.css',
})
export class OnceComponent {
  model = new FirstOperator('', '', '');

  onSubmit() {
    console.log(this.model);
  }
}
