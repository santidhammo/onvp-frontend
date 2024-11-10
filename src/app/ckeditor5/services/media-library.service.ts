import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

let resolveMedia: MediaResolve | null = null;
let rejectMedia: MediaReject | null = null;

@Injectable({
  providedIn: 'root',
})
export class MediaLibraryService {
  constructor() {}

  private mediaRequested$ = new BehaviorSubject<boolean>(false);

  requestPictureUrl(): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {
      resolveMedia = resolve;
      rejectMedia = reject;
      console.log('Resolve:', resolveMedia);
      console.log('Reject:', rejectMedia);
      this.mediaRequested$.next(true);
    });
    return promise;
  }

  get observeMediaRequested(): Observable<boolean> {
    return this.mediaRequested$.asObservable();
  }

  setMediaUrl(url: string): void {
    console.log('Resolve: ', resolveMedia);
    if (resolveMedia) {
      resolveMedia(url);
    }
    this.stopRequest();
  }

  cancelMediaUrl(): void {
    console.log('Reject: ', rejectMedia);
    if (rejectMedia) {
      rejectMedia($localize`Cancelled by user`);
    }
    this.stopRequest();
  }

  private stopRequest() {
    this.mediaRequested$.next(false);
    resolveMedia = null;
    rejectMedia = null;
  }
}

type MediaResolve = (value: string | PromiseLike<string>) => void;
type MediaReject = (reason?: any) => void;
