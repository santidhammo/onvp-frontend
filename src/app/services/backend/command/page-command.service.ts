import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CreatePageCommand } from '../../../model/commands/create-page-command';
import { UpdatePageCommand } from '../../../model/commands/update-page-command';
import { PublishPageCommand } from '../../../model/commands/publish-page-command';

@Injectable({
  providedIn: 'root',
})
export class PageCommandService {
  constructor(private http: HttpClient) {}

  async create(command: CreatePageCommand): Promise<void> {
    await firstValueFrom(this.http.post(`/api/pages/v1/page/`, command));
  }

  async setContent(id: number, content: String): Promise<void> {
    await firstValueFrom(
      this.http.put(`/api/pages/v1/page/${id}/content`, content, {
        headers: new HttpHeaders({
          'Content-Type': 'text/plain',
        }),
      }),
    );
  }

  async update(id: number, command: UpdatePageCommand): Promise<void> {
    await firstValueFrom(this.http.put(`/api/pages/v1/page/${id}`, command));
  }

  async publish(id: number, command: PublishPageCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(`/api/pages/v1/page/${id}/publication`, command),
    );
  }

  async unpublish(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete(`/api/pages/v1/page/${id}/publication`),
    );
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`/api/pages/v1/page/${id}`));
  }
}
