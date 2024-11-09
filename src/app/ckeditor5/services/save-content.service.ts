import { Injectable } from '@angular/core';
import { PageCommandService } from '../../services/backend/command/page-command.service';
import { ContentModel } from '../model/content.model';

@Injectable({
  providedIn: 'root',
})
export class SaveContentService {
  constructor(private pageCommandService: PageCommandService) {}

  save(model: ContentModel): Promise<void> {
    console.log(model);
    return this.pageCommandService.setContent(model.pageId, model.content);
  }
}
