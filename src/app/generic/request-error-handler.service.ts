import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestErrorHandlerService {
  private errorsSource = new BehaviorSubject<string | null>(null);

  constructor() {}

  handle(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.errorsSource.next($localize`An error occurred: ${error.error}`);
    } else {
      this.errorsSource.next(error.error);
    }
  }

  clearError(): void {
    this.errorsSource.next(null);
  }

  observeErrors(): Observable<string | null> {
    return this.errorsSource.asObservable();
  }
}
