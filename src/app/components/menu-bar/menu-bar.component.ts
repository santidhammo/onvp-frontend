import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthorizationRequestService } from '../../services/backend/request/authorization-request.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Role } from '../../generic/primitive/role';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './menu-bar.component.html',
})
export class MenuBarComponent {
  constructor(
    public authorizationRequestService: AuthorizationRequestService,
  ) {}

  protected readonly Role = Role;
}
