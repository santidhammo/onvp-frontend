import { Component, input, output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { Observable } from 'rxjs';
import { ImageCommandService } from '../../../services/backend/command/image-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { InputType } from '../../../generic/primitive/input-type';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';

@Component({
  selector: 'config-image-upload',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    CancelComponent,
    DialogComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    NgIf,
    SubmitComponent,
    TextEntryComponent,
  ],
  templateUrl: './image-upload.component.html',
})
export class ImageUploadComponent {
  enabledInput = input.required<Observable<boolean>>();
  onSaved = output();
  onCancelled = output();
  protected selectedFile: File | null = null;
  protected model = new ImageUploadModel();

  constructor(
    private imageCommandService: ImageCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  get observeEnabledInput(): Observable<boolean> {
    return this.enabledInput();
  }

  async submit(event: SubmitEvent): Promise<void> {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      if (this.selectedFile !== null) {
        try {
          await this.imageCommandService.upload(
            this.selectedFile,
            this.model.title,
          );
          this.onSaved.emit();
        } catch (error) {
          this.errorHandlerService.handle(error);
        }
      }
    } else {
      this.onCancelled.emit();
    }
  }

  onPictureSelected($event: Event) {
    if ($event.target !== null) {
      const target = $event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.selectedFile = target.files[0];
      }
    }
  }

  protected readonly InputType = InputType;
}

class ImageUploadModel {
  constructor(public title: string = '') {}
}
