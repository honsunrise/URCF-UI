import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ContentRoutes } from './content.routing';
import { BlankComponent } from './blank/blank.component';
import { WidgetsModule } from '../../widgets/widgets.module';
import { MasonryModule } from 'angular2-masonry';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { WatchComponent } from './watch/watch.component';
import { MainComponent } from './main/main.component';
import { CateComponent } from './cate/cate.component';
import { PublishComponent } from './publish/publish.component';
import { QuillModule } from 'ngx-quill/src/quill.module';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContentRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdToolbarModule,
    MdTabsModule,
    MdListModule,
    MdSlideToggleModule,
    MdSelectModule,
    NgxDatatableModule,
    FlexLayoutModule,
    MdProgressBarModule,
    MasonryModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    QuillModule,
    HttpClientModule,
    FileUploadModule,
    TreeModule,
    WidgetsModule
  ],
  declarations: [
    BlankComponent,
    MainComponent,
    CateComponent,
    WatchComponent,
    PublishComponent
  ]
})

export class ContentModule {
}