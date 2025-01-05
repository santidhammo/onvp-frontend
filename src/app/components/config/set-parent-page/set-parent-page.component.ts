import { Component, input, OnInit, output } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { BodyComponent } from '../../dialog/body/body.component';
import { CancelComponent } from '../../form/cancel/cancel.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../dialog/header/header.component';
import { SubmitComponent } from '../../form/submit/submit.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { PageCommandService } from '../../../services/backend/command/page-command.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { PageResponse } from '../../../model/responses/page-response';
import { MemberUpdateCommand } from '../../../model/commands/member-update-command';

@Component({
  selector: 'config-set-parent-page',
  standalone: true,
  imports: [
    AsyncPipe,
    BodyComponent,
    CancelComponent,
    DialogComponent,
    FooterComponent,
    FormsModule,
    HeaderComponent,
    SubmitComponent,
    NgForOf,
    NgIf,
  ],
  templateUrl: './set-parent-page.component.html',
  styles: ``,
})
export class SetParentPageComponent implements OnInit {
  pageIdObservableInput = input.required<Observable<number | null>>();
  onSaved = output();
  onCancelled = output();

  protected id$ = new BehaviorSubject<number | null>(null);
  private title$ = new BehaviorSubject<string | null>(null);
  private parentPages$ = new BehaviorSubject<PageResponse[]>([]);

  constructor(
    private pageRequestService: PageRequestService,
    private pageCommandService: PageCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  protected model: { selectedParentPageId: number | null } = {
    selectedParentPageId: null,
  };

  async ngOnInit() {
    try {
      this.startObservingPageIdInput();
      const mainMenu = await this.pageRequestService.mainMenu();
      this.parentPages$.next(mainMenu);
    } catch (error) {
      this.errorHandlerService.handle(error);
    }
  }

  protected get observeTitle(): Observable<string | null> {
    return this.title$.asObservable();
  }

  protected get observeMainPages(): Observable<PageResponse[]> {
    return this.parentPages$.asObservable();
  }

  private startObservingPageIdInput() {
    this.pageIdObservableInput().subscribe((pageId) => {
      if (pageId !== null) {
        this.pageRequestService
          .find(pageId)
          .then((response) => {
            this.title$.next(response.title);
            this.id$.next(response.id);
          })
          .catch((error) => this.errorHandlerService.handle(error));
      } else {
        this.title$.next(null);
      }
    });
  }

  submit(event: SubmitEvent) {
    const submitter = event.submitter as HTMLFormElement;
    if (submitter.name !== 'cancel') {
      const lastId = this.id$.getValue();
      if (lastId && this.model.selectedParentPageId) {
        this.pageCommandService
          .setOrUnsetParentPage(lastId, this.model.selectedParentPageId)
          .then(() => this.onSaved.emit())
          .catch((error) => this.errorHandlerService.handle(error));
      }
    } else {
      this.onCancelled.emit();
    }
  }
}
