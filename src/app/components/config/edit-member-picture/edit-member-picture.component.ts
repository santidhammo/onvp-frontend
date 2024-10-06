import { Component } from '@angular/core';
import { EditMemberPictureService } from '../../../services/member/edit-member-picture.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';

@Component({
  selector: 'config-edit-member-picture',
  standalone: true,
  imports: [
    BodyComponent,
    CancelComponent,
    DialogComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    SubmitComponent,
    TextEntryComponent,
    AsyncPipe,
    NgOptimizedImage,
    NgIf,
  ],
  templateUrl: './edit-member-picture.component.html',
})
export class EditMemberPictureComponent {
  constructor(
    private editMemberPictureService: EditMemberPictureService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  pictureUrl$ = new BehaviorSubject<string | null>(null);
  memberId$ = new BehaviorSubject<number | null>(null);
  assetId$ = new BehaviorSubject<string | null>(null);
  selectedFile: File | null = null;

  ngOnInit() {
    this.editMemberPictureService
      .observeEditMemberPictureAsset()
      .subscribe((memberPictureAsset) => {
        if (memberPictureAsset) {
          this.memberId$.next(memberPictureAsset?.memberId);
          this.assetId$.next(memberPictureAsset?.assetId);
          this.pictureUrl$.next(memberPictureAsset?.pictureUrl);
        } else {
          this.assetId$.next(null);
          this.memberId$.next(null);
          this.pictureUrl$.next(null);
        }
      });
  }

  observePictureUrl(): Observable<string | null> {
    return this.pictureUrl$.asObservable();
  }

  async submit(event: SubmitEvent): Promise<void> {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      if (this.selectedFile !== null) {
        try {
          await this.editMemberPictureService.save(this.selectedFile);
        } catch (error) {
          this.errorHandlerService.handle(error);
        }
      }
    }
    this.editMemberPictureService.stopEdit();
  }

  onPictureSelected($event: Event) {
    if ($event.target !== null) {
      const target = $event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.selectedFile = target.files[0];
      }
    }
  }
}
