import { Component, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { TokenData } from '../../security/token-data';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { waitForAsync } from '@angular/core/testing';
import { RequestErrorHandlerService } from '../../generic/request-error-handler.service';

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
  protected model: TokenData = new TokenData();
  private activationBase64PngSource = new BehaviorSubject<string>('');

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private requestErrorHandlerService: RequestErrorHandlerService,
  ) {}

  async ngOnInit() {
    const params = await firstValueFrom(this.route.paramMap);
    const activationString = String(params.get('activationString'));

    try {
      const pngData =
        'data:image/png;base64, ' +
        (await firstValueFrom(
          this.http.get<string>(
            `/api/members/activation/code/${activationString}`,
          ),
        ));
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

  async await_activation(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post('/api/members/activation/activate', this.model),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
    }
  }

  onSubmit() {
    console.log(this.model);
    this.await_activation().then((_) => {
      this.router.navigate(['']).then((_) => {});
    });
  }
}
