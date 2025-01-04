import { Component, OnInit } from '@angular/core';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { PageResponse } from '../../../model/responses/page-response';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MembersComponent } from '../../config/members/members.component';
import { PagesComponent } from '../../config/pages/pages.component';
import { RolesComponent } from '../../config/roles/roles.component';
import { WorkgroupsComponent } from '../../config/workgroups/workgroups.component';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'route-page',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgClass],
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  private mainMenu$ = new BehaviorSubject<PageResponse[]>([]);
  private content$ = new BehaviorSubject<String>('');
  private pageId$ = new BehaviorSubject<number>(0);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageRequestService: PageRequestService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.mainMenu$.next(await this.pageRequestService.mainMenu());
      this.startObservingParamMap();
    } catch (error) {
      this.errorHandlerService.handle(error);
    }
  }

  private startObservingParamMap() {
    this.route.paramMap.subscribe(async (params) => {
      await this.handleParamMapChange(params);
    });
  }

  private async handleParamMapChange(params: ParamMap) {
    try {
      const pageId = params.get('id');
      if (pageId) {
        const numericId = parseInt(pageId);
        this.pageId$.next(numericId);
        let content = await this.pageRequestService.content(numericId);
        this.content$.next(content);
      } else {
        const defaultPage = await this.pageRequestService.getDefault();
        if (defaultPage) {
          await this.setPage(defaultPage.id);
        }
      }
    } catch (error) {
      this.errorHandlerService.handle(error);
    }
  }

  get observeMainMenu(): Observable<PageResponse[]> {
    return this.mainMenu$.asObservable();
  }

  get observeContent(): Observable<String> {
    return this.content$.asObservable();
  }

  get observePageId(): Observable<number> {
    return this.pageId$.asObservable();
  }

  async setPage(pageId: number) {
    try {
      await this.router.navigate([`/`, pageId], {});
    } catch (error) {
      this.errorHandlerService.handle(error);
    }
  }
}
