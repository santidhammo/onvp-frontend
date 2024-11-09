/*
 *  ONVP Frontend - Frontend of the ONVP website
 *
 * Copyright (c) 2024.  Sjoerd van Leent
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageResize,
  ImageTextAlternative,
  ImageToolbar,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  Paragraph,
  SelectAll,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  type EditorConfig,
} from 'ckeditor5';
import { MediaLibrary } from '../../../ckeditor5/plugins/media-library';
import { MediaLibraryService } from '../../../ckeditor5/services/media-library.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../services/handlers/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRequestService } from '../../../services/backend/request/page-request.service';
import {
  SaveContent,
  SaveContentConfig,
} from '../../../ckeditor5/plugins/save-content';
import { FormsModule } from '@angular/forms';
import { SaveContentService } from '../../../ckeditor5/services/save-content.service';
import { ContentModel } from '../../../ckeditor5/model/content.model';

@Component({
  selector: 'route-page-editor',
  standalone: true,
  imports: [CommonModule, CKEditorModule, FormsModule],
  styleUrl: './page-editor.component.css',
  templateUrl: './page-editor.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageEditorComponent implements AfterViewInit, OnInit {
  @ViewChild('editorMenuBarElement')
  private editorMenuBar!: ElementRef<HTMLDivElement>;

  @ViewChild('editor') editorComponent!: CKEditorComponent;

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.

  public model = new ContentModel();

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private pictureLibraryService: MediaLibraryService,
    private pageRequestService: PageRequestService,
    private saveContentService: SaveContentService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      let params = await firstValueFrom(this.route.paramMap);
      const pageId = parseInt(String(params.get('id')));
      const page = await this.pageRequestService.find(pageId);
      const content = await this.pageRequestService.content(pageId);

      this.model.content = content;
      this.model.pageId = pageId;
      this.model.title = page.title;

      console.log(this.model);
    } catch (error) {
      this.errorHandlerService.handle(error as HttpErrorResponse);
    }
  }

  ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'saveContent',
          '|',
          'undo',
          'redo',
          '|',
          'sourceEditing',
          'showBlocks',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'mediaLibrary',
          'insertTable',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Autoformat,
        AutoImage,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        BlockToolbar,
        Bold,
        Essentials,
        Heading,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageResize,
        ImageTextAlternative,
        ImageToolbar,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        ListProperties,
        Paragraph,
        SelectAll,
        ShowBlocks,
        SimpleUploadAdapter,
        SourceEditing,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Undo,
      ],
      extraPlugins: [MediaLibrary, SaveContent],
      balloonToolbar: [
        'bold',
        'italic',
        '|',
        'link',
        'mediaLibrary',
        '|',
        'bulletedList',
        'numberedList',
      ],
      blockToolbar: [
        'bold',
        'italic',
        '|',
        'link',
        'mediaLibrary',
        'insertTable',
        '|',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
      ],
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'resizeImage',
        ],
        upload: {
          types: ['png', 'jpeg'],
        },
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      menuBar: {
        isVisible: true,
      },
      placeholder: 'Type or paste your content here!',
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
      },
    };

    // Force the picture library service, this is not defined by the EditorConfig definition,
    // but will work nonetheless. Do not remove @ts-ignore.
    // @ts-ignore
    this.config['mediaLibrary.service'] = this.pictureLibraryService;

    // Force the save content service, this is not defined by the EditorConfig definition,
    // but will work nonetheless. Do not remove @ts-ignore.

    // @ts-ignore
    this.config['saveContent'] = new SaveContentConfig(
      async (data): Promise<void> => {
        this.model.content = String(data);
        await this.saveContentService.save(this.model);
      },
      this.errorHandlerService,
    );

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }
}
