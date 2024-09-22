import { Injectable } from '@angular/core';
import { MembersService } from './members.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberRegistrationDataModel } from './member-registration-data-model';

@Injectable({
  providedIn: 'root',
})
export class MemberRegistrationService {
  registrationEnabled$ = new BehaviorSubject<boolean>(false);

  constructor(private membersService: MembersService) {}

  startRegistration() {
    this.registrationEnabled$.next(true);
  }

  stopRegistration() {
    this.registrationEnabled$.next(false);
  }

  observeRegistrationEnabled(): Observable<boolean> {
    return this.registrationEnabled$.asObservable();
  }

  async registerMember(model: MemberRegistrationDataModel) {
    await this.membersService.registerMember(model);
  }
}
