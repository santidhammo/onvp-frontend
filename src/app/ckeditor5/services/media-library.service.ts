import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaLibraryService {
  constructor() {}

  async requestPictureUrl(): Promise<string> {
    return 'hello';
  }
}
