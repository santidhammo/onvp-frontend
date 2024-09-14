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
    console.log(error);
    let errorObject = error.error;
    if (errorObject.kind === 'BAD_REQUEST') {
      this.errorsSource.next($localize`Error requesting the server for data`);
    } else if (errorObject.message === '') {
      this.errorsSource.next($localize`Unknown error occurred`);
    } else {
      this.errorsSource.next(
        $localize`Server returned error: ${errorObject.message}`,
      );
    }
  }

  clearError(): void {
    this.errorsSource.next(null);
  }

  observeErrors(): Observable<string | null> {
    return this.errorsSource.asObservable();
  }
}
