import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {parseJson} from "@angular/cli/src/utilities/json-file";


@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor(private http: HttpClient) {}

  async shouldSetup(): Promise<boolean> {
      const data = await firstValueFrom(this.http.get('/api/members/operator_check'));
      return data === false;
  }

}
