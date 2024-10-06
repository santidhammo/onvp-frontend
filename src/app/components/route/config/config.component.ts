import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MemberDetailsComponent } from '../../config/members/member-details.component';

@Component({
  selector: 'route-config',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, MemberDetailsComponent],
  templateUrl: './config.component.html',
})
export class ConfigComponent {
  private configModeSwitch = new BehaviorSubject<String>('general');

  observeConfigMode(): Observable<String> {
    return this.configModeSwitch.asObservable();
  }

  switchConfig(configMode: string) {
    this.configModeSwitch.next(configMode);
  }
}
