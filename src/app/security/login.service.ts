import { Injectable, output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { LoginData } from './login-data';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedInSource = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  public activate() {
    this.loggedInSource.next(true);
  }

  public deactivate() {
    this.loggedInSource.next(false);
  }

  public observeLoggedIn(): Observable<boolean> {
    return this.loggedInSource.asObservable();
  }

  async tryLogin(loginData: LoginData): Promise<void> {
    await firstValueFrom(this.http.post('/api/members/login', loginData));
  }
}
