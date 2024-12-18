import { Component, Input, input, OnInit, output, Output } from '@angular/core';
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
  showTotals = input<boolean>(false);

  private totalCount$ = new BehaviorSubject<number | null>(null);
  protected page$ = new BehaviorSubject<number | null>(null);
  private pageCount$ = new BehaviorSubject<number>(0);
  private navigatorPages$ = new BehaviorSubject<NavigatorPage[]>([]);
  private start$ = new BehaviorSubject<number>(0);
  private end$ = new BehaviorSubject<number>(0);

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
        this.start$.next(result.start);
        this.end$.next(result.end);

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

  isFirstPage(): boolean {
    return this.start$.getValue() == 0;
  }

  isLastPage(): boolean {
    return this.end$.getValue() == this.totalCount$.getValue();
  }

  doNothing() {}

  calculateLastPage(): number {
    return this.pageCount$.getValue();
  }
}
