import { Component } from '@angular/core';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { AuthorizationRequest } from '../../../model/requests/authorization-request';
import { SubmitComponent } from '../../form/submit/submit.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthorizationRequestService } from '../../../services/backend/request/authorization-request.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BodyComponent,
    DialogComponent,
    ExplanationComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    TextEntryComponent,
    SubmitComponent,
    NgIf,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  model = new AuthorizationRequest();
  loginFailed: boolean = false;

  constructor(
    private router: Router,
    private loginService: AuthorizationRequestService,
  ) {}

  onSubmit() {
    this.loginService
      .login(this.model)
      .then((_) => {
        this.router.navigate(['']).then((_) => {});
      })
      .catch((_) => {
        this.loginFailed = true;
      });
  }
}
