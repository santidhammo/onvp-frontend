import { Injectable } from '@angular/core';
import { MemberUpdateCommand } from '../../../model/commands/member-update-command';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MemberRegistrationCommand } from '../../../model/commands/member-registration-command';
import { MemberUpdateAddressCommand } from '../../../model/commands/member-update-address-command';

@Injectable({
  providedIn: 'root',
})
export class MemberCommandService {
  constructor(private http: HttpClient) {}

  async update(id: number, command: MemberUpdateCommand): Promise<void> {
    await firstValueFrom(this.http.post(`/api/members/${id}`, command));
  }

  async updateAddress(
    id: number,
    command: MemberUpdateAddressCommand,
  ): Promise<void> {
    await firstValueFrom(this.http.post(`/api/members/${id}/address`, command));
  }

  async register(model: MemberRegistrationCommand) {
    await firstValueFrom(this.http.post('/api/members/', model));
  }

  async savePictureAsset(file: File, id: number) {
    await firstValueFrom(
      this.http.post<null>(`/api/members/${id}/picture.png`, file),
    );
  }
}
