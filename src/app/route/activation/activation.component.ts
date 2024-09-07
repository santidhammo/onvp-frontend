import { Component, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BodyComponent } from '../../dialog/body/body.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { TokenData } from '../../security/token-data';

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
  ],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css',
})
export class ActivationComponent {
  protected model: TokenData = new TokenData();
  protected activationString$!: Observable<String>;
  protected activationBase64Png$!: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activationString$ = this.route.paramMap.pipe(
      map((params) => {
        const result = String(params.get('activationString'));
        this.model.activationString = result;
        return result;
      }),
    );

    this.activationBase64Png$ = this.activationString$
      .pipe(
        switchMap((activationString) =>
          this.http.get(`/api/members/activation/code/${activationString}`),
        ),
      )
      .pipe(map((pngData) => 'data:image/png;base64, ' + String(pngData)));
  }

  async await_activation(): Promise<void> {
    await firstValueFrom(
      this.http.post('/api/members/activation/activate', this.model),
    );
  }

  onSubmit() {
    console.log(this.model);
    this.await_activation().then((_) => {
      this.router.navigate(['']).then((_) => {});
    });
  }
}
