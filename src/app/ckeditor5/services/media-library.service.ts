import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaLibraryService {
  constructor() {}

  private resolve$ = new BehaviorSubject<MediaResolve | null>(null);
  private reject$ = new BehaviorSubject<MediaReject | null>(null);
  private mediaRequested$ = new BehaviorSubject<boolean>(false);

  requestPictureUrl(): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {
      this.resolve$.next(resolve);
      this.reject$.next(reject);
      this.mediaRequested$.next(true);
    });
    return promise;
  }

  get observeMediaRequested(): Observable<boolean> {
    return this.mediaRequested$.asObservable();
  }

  setMediaUrl(url: string): void {
    let resolve = this.resolve$.getValue();
    if (resolve) {
      this.stopRequest();
      resolve(url);
    }
  }

  cancelMediaUrl(): void {
    let reject = this.reject$.getValue();
    if (reject) {
      this.stopRequest();
      reject($localize`Cancelled by user`);
    }
  }

  private stopRequest() {
    this.mediaRequested$.next(false);
    this.resolve$.next(null);
    this.reject$.next(null);
  }
}

type MediaResolve = (value: string | PromiseLike<string>) => void;
type MediaReject = (reason?: any) => void;
