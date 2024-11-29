import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RegisterMusicalInstrumentCommand } from '../../../model/commands/register-musical-instrument-command';
import { UpdateMusicalInstrumentCommand } from '../../../model/commands/update-musical-instrument-command';

@Injectable({
  providedIn: 'root',
})
export class MusicalInstrumentCommandService {
  constructor(private http: HttpClient) {}

  async register(command: RegisterMusicalInstrumentCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(`/api/musical-instruments/v1/instrument/`, command),
    );
  }

  async update(
    id: number,
    command: UpdateMusicalInstrumentCommand,
  ): Promise<void> {
    await firstValueFrom(
      this.http.put(`/api/musical-instruments/v1/instrument/${id}`, command),
    );
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete(`/api/musical-instruments/v1/instrument/${id}`),
    );
  }
}
