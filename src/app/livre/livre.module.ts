import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryModule } from '@cloudinary/ng';
import { LivreRoutingModule } from './livre-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { MatCardModule } from '@angular/material/card';

// import and register filepond file type validation plugin

import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import * as FilepondPluginImageEdit from 'filepond-plugin-image-edit';
import * as FilepondPluginImagePreview from 'filepond-plugin-image-preview';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

registerPlugin(
  FilePondPluginFileValidateType,
  FilepondPluginImageEdit,
  FilepondPluginImagePreview
);
@NgModule({
  declarations: [IndexComponent, EditComponent, CreateComponent, ViewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    LivreRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    CloudinaryModule,
    FilePondModule,
    MatCardModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class LivreModule {}
