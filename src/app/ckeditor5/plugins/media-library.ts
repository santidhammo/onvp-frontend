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

import { ButtonView, icons, Plugin } from 'ckeditor5';
import { MediaLibraryService } from '../services/media-library.service';

export class MediaLibrary extends Plugin {
  init() {
    console.log('Media Library Plugin Initializing');
    const editor = this.editor;

    editor.config.define('mediaLibrary', {
      service: null,
    });

    editor.ui.componentFactory.add('mediaLibrary', () => {
      const button = new ButtonView();
      button.set({
        label: $localize`Media Library`,
        icon: icons.image,
      });

      button.on('execute', () => {
        const now = Date.now();
        console.log(`Executing: ${now}`);
        const service = editor.config.get('mediaLibrary.service');
        if (service instanceof MediaLibraryService) {
          service.requestPictureUrl().then((url) =>
            editor.model.change((writer) => {
              console.log('URL:', url);
              const imageElement = writer.createElement('imageBlock', {
                src: url,
              });

              // Insert the image in the current selection location.
              editor.model.insertContent(
                imageElement,
                editor.model.document.selection,
              );
            }),
          );
        }
      });

      return button;
    });
  }
}
