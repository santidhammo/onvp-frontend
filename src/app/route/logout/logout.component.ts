import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../security/login.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {
    loginService.logout().then(() => {
      router.navigate(['']).then((_) => {});
    });
  }
}
