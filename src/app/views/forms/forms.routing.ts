import { Routes } from '@angular/router';

import { BasicFormComponent } from './basic-form/basic-form.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

export const FormsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'basic',
      component: BasicFormComponent,
      data: { title: 'Basic', breadcrumb: 'BASIC' }
    }, {
      path: 'editor',
      component: RichTextEditorComponent,
      data: { title: 'Editor', breadcrumb: 'EDITOR' }
    }, {
      path: 'upload-audio',
      component: FileUploadComponent,
      data: { title: 'Upload Audio', breadcrumb: 'Upload Audio' }
    }, 
    
  ]
  }
];