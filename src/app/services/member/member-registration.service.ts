import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberRegistrationCommand } from '../../model/commands/member-registration-command';
import { MemberCommandService } from '../backend/command/member-command.service';

@Injectable({
  providedIn: 'root',
})
export class MemberRegistrationService {
  registrationEnabled$ = new BehaviorSubject<boolean>(false);

  constructor(private memberCommandService: MemberCommandService) {}

  startRegistration() {
    this.registrationEnabled$.next(true);
  }

  stopRegistration() {
    this.registrationEnabled$.next(false);
  }

  observeRegistrationEnabled(): Observable<boolean> {
    return this.registrationEnabled$.asObservable();
  }

  async registerMember(model: MemberRegistrationCommand) {
    await this.memberCommandService.register(model);
  }
}
