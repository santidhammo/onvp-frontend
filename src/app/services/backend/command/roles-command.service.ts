import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssociateRoleCommand } from '../../../model/commands/associate-role-command';
import { DissociateRoleCommand } from '../../../model/commands/dissociate-role-command';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesCommandService {
  constructor(private http: HttpClient) {}

  async associate(associateRoleCommand: AssociateRoleCommand) {
    await firstValueFrom(
      this.http.post('/api/roles/associate', associateRoleCommand),
    );
  }

  async dissociate(dissociateRoleCommand: DissociateRoleCommand) {
    await firstValueFrom(
      this.http.post('/api/roles/dissociate', dissociateRoleCommand),
    );
  }
}
