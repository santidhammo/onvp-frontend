import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UpdateMailTemplateCommand } from '../../../model/commands/update-mail-template-command';
import { CreateMailTemplateCommand } from '../../../model/commands/create-mail-template-command';

@Injectable({
  providedIn: 'root',
})
export class MailTemplateCommandService {
  constructor(private http: HttpClient) {}

  async create(command: CreateMailTemplateCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(`/api/mail-templates/v1/template/`, command),
    );
  }

  async update(id: number, command: UpdateMailTemplateCommand): Promise<void> {
    await firstValueFrom(
      this.http.put(`/api/mail-templates/v1/template/${id}`, command),
    );
  }
}
