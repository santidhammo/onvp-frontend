import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { MemberActivationCommand } from '../../../model/commands/member-activation-command';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';

@Component({
  selector: 'route-activation',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    DialogComponent,
    ExplanationComponent,
    FormsModule,
    HeaderComponent,
    TextEntryComponent,
    FooterComponent,
    SubmitComponent,
  ],
  templateUrl: './activation.component.html',
})
export class ActivationComponent {
  protected model: MemberActivationCommand = new MemberActivationCommand();
  private activationBase64PngSource = new BehaviorSubject<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestErrorHandlerService: ErrorHandlerService,
    private memberRequestService: MemberRequestService,
  ) {}

  async ngOnInit() {
    const params = await firstValueFrom(this.route.paramMap);
    const activationString = String(params.get('activationString'));

    try {
      const pngData =
        await this.memberRequestService.activation_code(activationString);
      this.model.activationString = activationString;
      this.activationBase64PngSource.next(pngData);
    } catch (error) {
      await this.router.navigate(['']);
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
    }
  }

  public observeActivationBase64Png(): Observable<string> {
    return this.activationBase64PngSource.asObservable();
  }

  submit() {
    this.memberRequestService
      .activate(this.model)
      .then((_) => {
        this.router.navigate(['']).finally(null);
      })
      .catch(this.requestErrorHandlerService.handle);
  }
}
