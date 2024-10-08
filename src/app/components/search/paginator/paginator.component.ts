import { Component, input, OnInit, output, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResult } from '../../../model/search/search-result';
import { NavigatorPage } from '../../../model/search/navigator-page';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgIf, NgForOf],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent<T> implements OnInit {
  searchResultProvider = input.required<Observable<SearchResult<T> | null>>();
  navigateTo = output<number>();

  private totalCount$ = new BehaviorSubject<number | null>(null);
  private page$ = new BehaviorSubject<number | null>(null);
  private pageCount$ = new BehaviorSubject<number>(0);
  private navigatorPages$ = new BehaviorSubject<NavigatorPage[]>([]);

  observeTotalCount(): Observable<number | null> {
    return this.totalCount$.asObservable();
  }

  observePage(): Observable<number | null> {
    return this.page$.asObservable();
  }

  observePageCount(): Observable<number> {
    return this.pageCount$.asObservable();
  }

  observeNavigatorPages(): Observable<NavigatorPage[]> {
    return this.navigatorPages$.asObservable();
  }

  ngOnInit(): void {
    this.searchResultProvider().subscribe((result) => {
      if (result !== null) {
        let page = result.pageOffset + 1;
        this.page$.next(page);
        this.pageCount$.next(result.pageCount);
        this.totalCount$.next(result.totalCount);

        const startPage = Math.max(1, page - 5);
        const endPage = Math.min(page + 5, result.pageCount);
        let navigator = [];
        for (let i = startPage; i <= endPage; i++) {
          navigator.push(
            new NavigatorPage(i, i === page, i === startPage, i === endPage),
          );
        }
        this.navigatorPages$.next(navigator);
      }
    });
  }
}
