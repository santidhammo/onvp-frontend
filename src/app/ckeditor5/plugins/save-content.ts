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

import { ButtonView, Plugin } from 'ckeditor5';
import { ErrorHandlerService } from '../../services/handlers/error-handler.service';

export type saveCallback = (data: String) => Promise<void>;

export class SaveContentConfig {
  constructor(
    public callBack: saveCallback,
    public errorHandlerService: ErrorHandlerService,
  ) {}
}

export class SaveContent extends Plugin {
  init() {
    console.log('Save Content Plugin Initializing');
    const editor = this.editor;

    editor.config.define('saveContent', SaveContentConfig);

    editor.ui.componentFactory.add('saveContent', () => {
      const button = new ButtonView();
      button.set({
        label: $localize`Save`,
        withText: true,
      });

      button.on('execute', () => {
        const now = Date.now();
        console.log(`Executing: ${now}`);
        const saveContent: SaveContentConfig = editor.config.get(
          'saveContent',
        ) as SaveContentConfig;

        saveContent.callBack(editor.data.get()).catch((e) => {
          saveContent.errorHandlerService.handle(e);
        });
      });

      return button;
    });
  }
}
