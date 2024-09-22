import { Component, Input } from '@angular/core';
import { MembersService } from '../members.service';
import { BehaviorSubject, last, Observable } from 'rxjs';
import { MemberWithDetail } from '../../interfaces/member-with-detail';
import { TextEntryComponent } from '../../form/text-entry/text-entry.component';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../form/submit/submit.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavigatorPage } from '../../generic/navigator-page';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { EditMemberWithDetailModelService } from '../edit-member-with-detail-model.service';
import { EditMemberPictureService } from '../edit-member-picture.service';
import { EditMemberPictureComponent } from '../edit-member-picture/edit-member-picture.component';
import { ConfigRegisterMemberComponent } from '../config-register-member/config-register-member.component';
import { MemberRegistrationService } from '../member-registration.service';

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
    EditMemberComponent,
    EditMemberPictureComponent,
    ConfigRegisterMemberComponent,
  ],
  templateUrl: './member-details.component.html',
})
export class MemberDetailsComponent {
  private totalCount$ = new BehaviorSubject<number | null>(null);
  private page$ = new BehaviorSubject<number | null>(null);
  private pageCount$ = new BehaviorSubject<number>(0);
  private rows$ = new BehaviorSubject<MemberWithDetail[]>([]);
  private navigatorPages$ = new BehaviorSubject<NavigatorPage[]>([]);

  nameQuery: string = '';
  constructor(
    private memberService: MembersService,
    protected editMemberWithDetailModelService: EditMemberWithDetailModelService,
    protected editMemberPictureService: EditMemberPictureService,
    protected memberRegistrationService: MemberRegistrationService,
  ) {}

  ngOnInit() {
    this.doSearch();
  }

  observeTotalCount(): Observable<number | null> {
    return this.totalCount$.asObservable();
  }

  observePage(): Observable<number | null> {
    return this.page$.asObservable();
  }

  observePageCount(): Observable<number> {
    return this.pageCount$.asObservable();
  }

  observeRows(): Observable<MemberWithDetail[]> {
    return this.rows$.asObservable();
  }

  observeNavigatorPages(): Observable<NavigatorPage[]> {
    return this.navigatorPages$.asObservable();
  }

  refreshSearch() {
    const lastPage = this.page$.getValue();
    if (lastPage !== null) {
      this.doSearch(lastPage);
    } else {
      this.doSearch();
    }
  }

  doSearch(pageNumber: number = 1) {
    this.memberService
      .searchMemberDetails(this.nameQuery, pageNumber - 1)
      .then((result) => {
        let page = result.pageOffset + 1;
        this.page$.next(page);
        this.pageCount$.next(result.pageCount);
        this.totalCount$.next(result.totalCount);
        this.rows$.next(result.rows);

        const startPage = Math.max(1, page - 5);
        const endPage = Math.min(page + 5, result.pageCount);
        let navigator = [];
        for (let i = startPage; i <= endPage; i++) {
          navigator.push(
            new NavigatorPage(i, i === page, i === startPage, i === endPage),
          );
        }
        this.navigatorPages$.next(navigator);
      });
  }
}
