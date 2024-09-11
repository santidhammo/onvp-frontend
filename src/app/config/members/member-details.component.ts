import { Component, Input } from '@angular/core';
import { MembersService } from '../members.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberDetail } from '../../interfaces/member-detail';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

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
  ],
  templateUrl: './member-details.component.html',
})
export class MemberDetailsComponent {
  private totalCountSource = new BehaviorSubject<number | null>(null);
  private pageSource = new BehaviorSubject<number | null>(null);
  private pageCountSource = new BehaviorSubject<number | null>(null);
  private rowsSource = new BehaviorSubject<MemberDetail[]>([]);

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

  observePageCount(): Observable<number | null> {
    return this.pageCountSource.asObservable();
  }

  observeRows(): Observable<MemberDetail[]> {
    return this.rowsSource.asObservable();
  }

  protected doSearch() {
    if (this.nameQuery != null && this.nameQuery.length > 0) {
      this.memberService
        .searchMemberDetails(this.nameQuery, this.page - 1)
        .then((result) => {
          this.pageSource.next(result.pageOffset + 1);
          this.pageCountSource.next(result.pageCount);
          this.totalCountSource.next(result.totalCount);
          this.rowsSource.next(result.rows);
        });
    }
  }
}
