import { Component, Input } from '@angular/core';
import { MembersService } from '../members.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberWithDetail } from '../../interfaces/member-with-detail';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavigatorPage } from '../../generic/navigator-page';

@Component({
  selector: 'config-members',
  standalone: true,
  imports: [
    TextEntryComponent,
    FormsModule,
    SubmitComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgClass,
    RouterLink,
  ],
  templateUrl: './member-details.component.html',
})
export class MemberDetailsComponent {
  private totalCountSource = new BehaviorSubject<number | null>(null);
  private pageSource = new BehaviorSubject<number | null>(null);
  private pageCountSource = new BehaviorSubject<number>(0);
  private rowsSource = new BehaviorSubject<MemberWithDetail[]>([]);
  private navigatorPagesSource = new BehaviorSubject<NavigatorPage[]>([]);

  page: number = 1;
  // TODO: Need to get this from some kind of input field
  nameQuery: string | null = null;

  constructor(private memberService: MembersService) {}

  ngOnInit() {}

  observeTotalCount(): Observable<number | null> {
    return this.totalCountSource.asObservable();
  }

  observePage(): Observable<number | null> {
    return this.pageSource.asObservable();
  }

  observePageCount(): Observable<number> {
    return this.pageCountSource.asObservable();
  }

  observeRows(): Observable<MemberWithDetail[]> {
    return this.rowsSource.asObservable();
  }

  observeNavigatorPages(): Observable<NavigatorPage[]> {
    return this.navigatorPagesSource.asObservable();
  }

  protected doSearch() {
    if (this.nameQuery != null && this.nameQuery.length > 0) {
      this.memberService
        .searchMemberDetails(this.nameQuery, this.page - 1)
        .then((result) => {
          let page = result.pageOffset + 1;
          this.pageSource.next(page);
          this.pageCountSource.next(result.pageCount);
          this.totalCountSource.next(result.totalCount);
          this.rowsSource.next(result.rows);

          const startPage = Math.max(1, page - 5);
          const endPage = Math.min(page + 5, result.pageCount);
          let navigator = [];
          for (let i = startPage; i <= endPage; i++) {
            navigator.push(
              new NavigatorPage(i, i === page, i === startPage, i === endPage),
            );
          }
          this.navigatorPagesSource.next(navigator);
        });
    }
  }
}
