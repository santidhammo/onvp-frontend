import { WorkgroupResponse } from '../responses/workgroup-response';

export class WorkgroupUpdateCommand {
  constructor(public name: string = '') {}

  setup(workgroupResponse: WorkgroupResponse | null) {
    if (workgroupResponse) {
      this.name = workgroupResponse.name;
    } else {
      this.name = '';
    }
  }
}
