import { Component, input, OnInit, output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkgroupRequestService } from '../../../services/backend/request/workgroup-request.service';
import { WorkgroupCommandService } from '../../../services/backend/command/workgroup-command.service';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { HeaderComponent } from '../../dialog/header/header.component';
import { FooterComponent } from '../../dialog/footer/footer.component';
import { BodyComponent } from '../../dialog/body/body.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { WorkgroupResponse } from '../../../model/responses/workgroup-response';
import { ExplanationComponent } from '../../dialog/explanation/explanation.component';
import { MemberResponse } from '../../../model/responses/member-response';
import { SearchResult } from '../../../model/search/search-result';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { DialogSize } from '../../../generic/primitive/dialog-size';
import { AssociateMemberToWorkgroupCommand } from '../../../model/commands/associate-member-to-workgroup-command';
import { DissociateMemberFromWorkgroupCommand } from '../../../model/commands/dissociate-member-from-workgroup-command';

@Component({
  selector: 'config-workgroup-management',
  standalone: true,
  imports: [
    DialogComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    NgIf,
    AsyncPipe,
    ExplanationComponent,
    FormsModule,
    SubmitComponent,
    TextEntryComponent,
    PaginatorComponent,
    NgForOf,
    NgClass,
  ],
  templateUrl: './workgroup-management.component.html',
})
export class WorkgroupManagementComponent implements OnInit {
  workgroupIdObservableInput = input.required<Observable<number | null>>();
  onClose = output();

  workgroupResponse$ = new BehaviorSubject<WorkgroupResponse | null>(null);
  nameQuery = '';

  private availableMembersPage$ = new BehaviorSubject<number | null>(null);
  private availableMembersRows$ = new BehaviorSubject<MemberResponse[]>([]);
  private availableMembersSearchResult$ =
    new BehaviorSubject<SearchResult<MemberResponse> | null>(null);
  private workgroupMembers$ = new BehaviorSubject<MemberResponse[]>([]);
  private removeMemberIds$ = new BehaviorSubject<number[]>([]);
  private addMemberIds$ = new BehaviorSubject<number[]>([]);

  protected removeMemberIdsObservable = this.removeMemberIds$.asObservable();
  protected addMemberIdsObservable = this.addMemberIds$.asObservable();

  constructor(
    private workgroupRequestService: WorkgroupRequestService,
    private workgroupCommandService: WorkgroupCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.startObservingWorkgroupId();
  }

  get observeWorkgroupId(): Observable<number | null> {
    return this.workgroupIdObservableInput();
  }

  get observeWorkgroupResponse(): Observable<WorkgroupResponse | null> {
    return this.workgroupResponse$.asObservable();
  }

  get observeAvailableMembersSearchResult(): Observable<SearchResult<MemberResponse> | null> {
    return this.availableMembersSearchResult$.asObservable();
  }

  get observeAvailableMembersRows(): Observable<MemberResponse[]> {
    return this.availableMembersRows$.asObservable();
  }

  get observeWorkgroupMembers(): Observable<MemberResponse[]> {
    return this.workgroupMembers$.asObservable();
  }

  private startObservingWorkgroupId() {
    this.observeWorkgroupId.subscribe((workgroupId) => {
      this.nameQuery = '';
      this.workgroupResponse$.next(null);
      if (workgroupId) {
        this.workgroupRequestService
          .find(workgroupId)
          .then((workgroupResponse) => {
            this.workgroupRequestService
              .findMembers(workgroupId)
              .then((members) => {
                this.workgroupResponse$.next(workgroupResponse);
                this.workgroupMembers$.next(members);
                this.doAvailableMembersSearch();
              })
              .catch((e) => {
                this.errorHandlerService.handle(e);
              });
          })
          .catch((error: Error) => {
            this.errorHandlerService.handle(error);
          });
      }
    });
  }

  createExplanation(workgroupResponse: WorkgroupResponse) {
    return $localize`Manage workgroup: ${workgroupResponse.name}`;
  }

  doAvailableMembersSearch(pageNumber: number = 1) {
    const searchWorkgroup = this.workgroupResponse$.getValue();
    if (searchWorkgroup?.id) {
      this.workgroupRequestService
        .availableMembersSearch(
          searchWorkgroup.id,
          this.nameQuery,
          pageNumber - 1,
        )
        .then((result) => {
          let page = result.pageOffset + 1;
          this.availableMembersPage$.next(page);
          this.availableMembersRows$.next(result.rows);
          this.availableMembersSearchResult$.next(result);
        })
        .catch((e) => {
          this.errorHandlerService.handle(e);
        });
    }
  }

  resetAvailableMembersSearch() {
    const workgroupResponse = this.workgroupResponse$.getValue();
    if (workgroupResponse !== null) {
      this.addMemberIds$.next([]);
      this.removeMemberIds$.next([]);
      this.workgroupRequestService
        .findMembers(workgroupResponse.id)
        .then((members) => {
          this.workgroupMembers$.next(members);
          this.doAvailableMembersSearch();
        })
        .catch((e) => {
          this.errorHandlerService.handle(e);
        });
    }
  }

  protected readonly DialogSize = DialogSize;

  toggleMemberToRemove(id: number) {
    let ids = this.removeMemberIds$.getValue();
    if (ids.includes(id)) {
      const newIds = ids.filter((t) => t !== id);
      this.removeMemberIds$.next(newIds);
    } else {
      ids.push(id);
      this.removeMemberIds$.next(ids);
    }
  }

  toggleMemberToAdd(id: number) {
    let ids = this.addMemberIds$.getValue();
    if (ids.includes(id)) {
      const newIds = ids.filter((t) => t !== id);
      this.addMemberIds$.next(newIds);
    } else {
      ids.push(id);
      this.addMemberIds$.next(ids);
    }
  }

  doAdd() {
    const workgroupId = this.workgroupResponse$.getValue()?.id;
    if (workgroupId) {
      for (const memberId of this.addMemberIds$.getValue()) {
        this.workgroupCommandService
          .associate(
            new AssociateMemberToWorkgroupCommand(memberId, workgroupId),
          )
          .then(() => {
            this.resetAvailableMembersSearch();
          })
          .catch((error: Error) => {
            this.errorHandlerService.handle(error);
          });
      }
    }
  }

  doRemove() {
    const workgroupId = this.workgroupResponse$.getValue()?.id;
    if (workgroupId) {
      for (const memberId of this.removeMemberIds$.getValue()) {
        this.workgroupCommandService
          .dissociate(
            new DissociateMemberFromWorkgroupCommand(memberId, workgroupId),
          )
          .then(() => {
            this.resetAvailableMembersSearch();
          })
          .catch((error: Error) => {
            this.errorHandlerService.handle(error);
          });
      }
    }
  }
}
