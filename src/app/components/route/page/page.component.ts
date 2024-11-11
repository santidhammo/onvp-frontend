import { Component, OnInit } from '@angular/core';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageResponse } from '../../../model/responses/page-response';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MembersComponent } from '../../config/members/members.component';
import { PagesComponent } from '../../config/pages/pages.component';
import { RolesComponent } from '../../config/roles/roles.component';
import { WorkgroupsComponent } from '../../config/workgroups/workgroups.component';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';

@Component({
  selector: 'route-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MembersComponent,
    NgForOf,
    NgIf,
    PagesComponent,
    RolesComponent,
    WorkgroupsComponent,
    NgClass,
  ],
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  private mainMenu$ = new BehaviorSubject<PageResponse[]>([]);
  private currentPageId$ = new BehaviorSubject<number | null>(null);
  private content$ = new BehaviorSubject<String>('');
  constructor(
    private pageRequestService: PageRequestService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.mainMenu$.next(await this.pageRequestService.mainMenu());
    this.currentPageId$.subscribe(async (pageId: number | null) => {
      if (pageId) {
        this.pageRequestService
          .content(pageId)
          .then((content) => this.content$.next(content))
          .catch((e) => this.errorHandlerService.handle(e));
      } else {
        const defaultPage = await this.pageRequestService.getDefault();
        if (defaultPage) {
          this.currentPageId$.next(defaultPage.id);
        } else {
          this.content$.next('');
        }
      }
    });
  }

  get observeMainMenu(): Observable<PageResponse[]> {
    return this.mainMenu$.asObservable();
  }

  get observeContent(): Observable<String> {
    return this.content$.asObservable();
  }

  get observeCurrentPageId(): Observable<number | null> {
    return this.currentPageId$.asObservable();
  }

  setPage(pageId: number) {
    this.currentPageId$.next(pageId);
  }
}
