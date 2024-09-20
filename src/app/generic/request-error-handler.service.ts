import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestErrorHandlerService {
  constructor() {}

  errorsSource = new BehaviorSubject<string | null>(null);

  handle(error: HttpErrorResponse) {
    console.log(error);
    if (error.error !== null) {
      let errorObject = error.error;
      if (errorObject.kind === 'BAD_REQUEST') {
        this.errorsSource.next($localize`Error requesting the server for data`);
      } else if (error.message !== null && error.message !== '') {
        this.errorsSource.next(
          $localize`Server returned error: ${error.message}`,
        );
      } else if (errorObject.message !== null && errorObject.message !== '') {
        this.errorsSource.next(
          $localize`Server returned error: ${errorObject.message}`,
        );
      } else {
        this.errorsSource.next($localize`Unknown error occurred`);
      }
    } else {
      this.errorsSource.next(
        $localize`Server returned error: ${error.message}`,
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
