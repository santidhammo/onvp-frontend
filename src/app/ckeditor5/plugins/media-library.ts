import { ButtonView, icons, Plugin } from 'ckeditor5';
import { MediaLibraryService } from '../services/media-library.service';

export class MediaLibrary extends Plugin {
  init() {
    console.log('Picture Library Initializing');
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
