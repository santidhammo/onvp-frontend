import { Component, OnInit } from '@angular/core';
import { RoleClass } from '../../../generic/primitive/role-class';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberRequestService } from '../../../services/backend/request/member-request.service';
import { WorkgroupRequestService } from '../../../services/backend/request/workgroup-request.service';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { SearchResult } from '../../../model/search/search-result';
import { RoleClassComposition } from '../../../model/composed/role-class-composition';
import { RolesRequestService } from '../../../services/backend/request/roles-request.service';
import { Role } from '../../../generic/primitive/role';
import { MemberResponse } from '../../../model/responses/member-response';
import { WorkgroupResponse } from '../../../model/responses/workgroup-response';
import { PaginatorComponent } from '../../search/paginator/paginator.component';
import { AssociateRoleCommand } from '../../../model/commands/associate-role-command';
import { DissociateRoleCommand } from '../../../model/commands/dissociate-role-command';
import { RolesCommandService } from '../../../services/backend/command/roles-command.service';

@Component({
  selector: 'config-roles',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgClass,
    FormsModule,
    SubmitComponent,
    TextEntryComponent,
    PaginatorComponent,
    NgIf,
  ],
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  protected readonly RoleClass = RoleClass;

  private roleClass$ = new BehaviorSubject<RoleClass>(RoleClass.MEMBER);
  nameQuery: string = '';

  private page$ = new BehaviorSubject<number | null>(null);
  private rows$ = new BehaviorSubject<RoleClassComposition[]>([]);
  private searchResult$ =
    new BehaviorSubject<SearchResult<RoleClassComposition> | null>(null);
  private running$ = new BehaviorSubject<boolean>(false);

  constructor(
    private memberRequestService: MemberRequestService,
    private workgroupRequestService: WorkgroupRequestService,
    private rolesRequestService: RolesRequestService,
    private rolesCommandService: RolesCommandService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.observeRoleClass.subscribe((roleClass) => {
      this.resetNameQuery();
      this.doSearch();
    });
  }

  get observeRoleClass(): Observable<RoleClass> {
    return this.roleClass$.asObservable();
  }

  get observeSearchResult(): Observable<SearchResult<RoleClassComposition> | null> {
    return this.searchResult$.asObservable();
  }

  get observeRows(): Observable<RoleClassComposition[]> {
    return this.rows$.asObservable();
  }

  get observeRunning(): Observable<boolean> {
    return this.running$.asObservable();
  }

  switchClass(roleClass: RoleClass) {
    this.roleClass$.next(roleClass);
  }

  doSearch(pageNumber: number = 1) {
    if (!this.running$.getValue()) {
      const currentRoleClass = this.roleClass$.getValue();
      if (currentRoleClass == RoleClass.WORKGROUP) {
        this.workgroupRequestService
          .search(this.nameQuery, pageNumber - 1)
          .then((result) => {
            let composedResult = this.initComposedResult(result);
            this.continueFetchingWorkgroupRoles(composedResult, result.rows);
          })
          .catch((e) => {
            this.errorHandlerService.handle(e);
          });
      } else {
        this.memberRequestService
          .search(this.nameQuery, pageNumber - 1)
          .then((result) => {
            let composedResult = this.initComposedResult(result);
            this.continueFetchingMemberRoles(composedResult, result.rows);
          })
          .catch((e) => {
            this.errorHandlerService.handle(e);
          });
      }
    }
  }

  private continueFetchingWorkgroupRoles(
    composedResult: SearchResult<RoleClassComposition>,
    rows: WorkgroupResponse[],
  ) {
    let row = rows.pop();

    if (row) {
      const name = row.name;
      const id = row.id;
      this.rolesRequestService
        .list(RoleClass.WORKGROUP, row.id)
        .then((roles) => {
          this.addRowToComposedResult(
            composedResult,
            RoleClass.WORKGROUP,
            id,
            name,
            roles,
          );
          this.continueFetchingWorkgroupRoles(composedResult, rows);
        })
        .catch((e) => {
          this.errorHandlerService.handle(e);
          this.running$.next(false);
        });
    } else {
      this.finalizeResult(composedResult);
    }
  }

  private continueFetchingMemberRoles(
    composedResult: SearchResult<RoleClassComposition>,
    rows: MemberResponse[],
  ) {
    let row = rows.pop();

    if (row) {
      const name = row.fullName;
      const id = row.id;
      this.rolesRequestService
        .list(RoleClass.MEMBER, row.id)
        .then((roles) => {
          this.addRowToComposedResult(
            composedResult,
            RoleClass.MEMBER,
            id,
            name,
            roles,
          );
          this.continueFetchingMemberRoles(composedResult, rows);
        })
        .catch((e) => {
          this.errorHandlerService.handle(e);
          this.running$.next(false);
        });
    } else {
      this.finalizeResult(composedResult);
    }
  }

  private initComposedResult<T>(result: SearchResult<T>) {
    let composedResult: SearchResult<RoleClassComposition> = {
      pageOffset: result.pageOffset,
      totalCount: result.totalCount,
      pageCount: result.pageCount,
      rows: [],
    };
    return composedResult;
  }

  private addRowToComposedResult(
    composedResult: SearchResult<RoleClassComposition>,
    currentRoleClass: RoleClass,
    id: number,
    name: string,
    roles: Role[],
  ) {
    composedResult.rows.push(
      new RoleClassComposition(currentRoleClass, id, name, roles),
    );
  }

  private finalizeResult(composedResult: SearchResult<RoleClassComposition>) {
    let page = composedResult.pageOffset + 1;
    this.page$.next(page);
    this.rows$.next(composedResult.rows);
    this.searchResult$.next(composedResult);
    this.running$.next(false);
  }

  /// Resets the name query field to empty
  private resetNameQuery(): void {
    this.nameQuery = '';
  }

  changeRole(roleClass: RoleClass, id: number, role: Role, newState: boolean) {
    let page = 1;
    let currentPage = this.page$.getValue();
    if (currentPage) {
      page = currentPage;
    }
    if (newState) {
      const command = new AssociateRoleCommand(id, role, roleClass);
      this.rolesCommandService
        .associate(command)
        .then((_: any) => {
          if (this.page$.getValue()) {
            this.doSearch(page);
          }
        })
        .catch((error: any) => {
          this.errorHandlerService.handle(error);
        });
    } else {
      const command = new DissociateRoleCommand(id, role, roleClass);
      this.rolesCommandService
        .dissociate(command)
        .then((_: any) => {
          this.doSearch(page);
        })
        .catch((error: any) => {
          this.errorHandlerService.handle(error);
        });
    }
  }

  protected readonly Role = Role;
}
