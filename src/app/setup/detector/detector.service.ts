import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetectorService {
  constructor(private http: HttpClient) {}

  async shouldSetup(): Promise<boolean> {
    const data = await firstValueFrom(this.http.get('/api/setup/should_setup'));
    return data === true;
  }
}
