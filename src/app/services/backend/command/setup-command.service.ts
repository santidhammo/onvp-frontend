import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FirstOperatorRegisterCommand } from '../../../model/commands/first-operator-register-command';

@Injectable({
  providedIn: 'root',
})
export class SetupCommandService {
  constructor(private http: HttpClient) {}

  /// Set up the first operator
  async setupFirstOperator(
    command: FirstOperatorRegisterCommand,
  ): Promise<string> {
    const data = await firstValueFrom(
      this.http.post('/api/setup/setup_first_operator', command),
    );
    return data.toString();
  }
}
