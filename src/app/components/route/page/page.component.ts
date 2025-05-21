import { Component, OnInit } from '@angular/core';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { PageResponse } from '../../../model/responses/page-response';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'route-page',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgClass, NgIf],
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  private mainMenuPageIds$ = new BehaviorSubject<Set<number>>(new Set());
  private mainMenu$ = new BehaviorSubject<PageResponse[]>([]);
  private events$ = new BehaviorSubject<PageResponse[]>([]);
  private subMenu$ = new BehaviorSubject<SubMenu>(SubMenu.empty);
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
      this.mainMenuPageIds$.next(
        new Set(
          this.mainMenu$.value.map((page: PageResponse) => {
            return page.id;
          }),
        ),
      );
      this.events$.next(await this.pageRequestService.events());
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
        const subMenu = await this.subMenu(numericId);
        this.subMenu$.next(subMenu);
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

  private async subMenu(numericId: number) {
    if (this.mainMenuPageIds$.value.has(numericId)) {
      // If the page is part of the main menu, then acquire the associated sub-menu
      const subMenuPages = await this.pageRequestService.subMenu(numericId);
      return new SubMenu(numericId, subMenuPages);
    } else {
      // If it's not, then the page is a child page with a parent
      const childPage = await this.pageRequestService.find(numericId);

      if (childPage.parentId) {
        const subMenuPages = await this.pageRequestService.subMenu(
          childPage.parentId,
        );
        return new SubMenu(childPage.parentId, subMenuPages);
      } else {
        return SubMenu.empty;
      }
    }
  }

  get observeMainMenu(): Observable<PageResponse[]> {
    return this.mainMenu$.asObservable();
  }

  get observeEvents(): Observable<PageResponse[]> {
    return this.events$.asObservable();
  }

  get observeContent(): Observable<String> {
    return this.content$.asObservable();
  }

  get observePageId(): Observable<number> {
    return this.pageId$.asObservable();
  }

  get observeSubMenu(): Observable<SubMenu> {
    return this.subMenu$.asObservable();
  }

  async setPage(pageId: number) {
    try {
      await this.router.navigate([`/`, pageId], {});
    } catch (error) {
      this.errorHandlerService.handle(error);
    }
  }
}

class SubMenu {
  constructor(
    readonly parentId: number | null,
    readonly pages: PageResponse[],
  ) {}

  static get empty() {
    return new SubMenu(null, []);
  }
}
