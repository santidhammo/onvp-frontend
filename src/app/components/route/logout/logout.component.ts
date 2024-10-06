import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationRequestService } from '../../../services/backend/request/authorization-request.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private loginService: AuthorizationRequestService,
  ) {
    loginService.logout().then(() => {
      router.navigate(['']).then((_) => {});
    });
  }
}
