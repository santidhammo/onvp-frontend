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
  private loggedInNameSource = new BehaviorSubject('');
  private loggedInIsOperatorSource = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  /// Returns an observable to determine if a user is logged in, of true, the observable will emit true, otherwise
  /// it will emit false.
  observeLoggedIn(): Observable<boolean> {
    return this.loggedInSource.asObservable();
  }

  /// Returns an observable to determine the name of the logged in user. If a user is not logged in, the name will be
  /// empty.
  observeLoggedInName(): Observable<string> {
    return this.loggedInNameSource.asObservable();
  }

  /// Returns an observable to determine if the user is an operator. If a user is not an operator, or no user is
  /// logged in, false will be emitted.
  observeLoggedInIsOperator(): Observable<boolean> {
    return this.loggedInIsOperatorSource.asObservable();
  }

  public activate() {
    this.loggedInSource.next(true);
    this.registerLoggedInName();
    this.registerLoggedInIsOperator();
  }

  public deactivate() {
    this.loggedInSource.next(false);
    this.loggedInNameSource.next('');
    this.loggedInIsOperatorSource.next(false);
  }

  async tryLogin(loginData: LoginData): Promise<void> {
    await firstValueFrom(this.http.post('/api/members/login', loginData));
  }

  async testLogin(): Promise<void> {
    let result = firstValueFrom(
      this.http.get('/api/members/check_login_status'),
    );
    result.then((_) => this.activate()).catch((_) => this.deactivate());
  }

  async logout() {
    await firstValueFrom(this.http.get('/api/members/logout'));
    this.deactivate();
  }

  registerLoggedInName() {
    firstValueFrom(this.http.get('/api/members/logged_in_name')).then((data) =>
      this.loggedInNameSource.next(data.toString()),
    );
  }

  private registerLoggedInIsOperator() {
    firstValueFrom(this.http.get('/api/members/logged_in_is_operator')).then(
      (data) => this.loggedInIsOperatorSource.next(true),
    );
  }
}
