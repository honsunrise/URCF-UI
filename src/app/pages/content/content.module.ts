import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {QuillModule} from 'ngx-quill';
import {HttpClientModule} from '@angular/common/http';
import {NgFileDropDirective} from 'ngx-uploader';
import {TranslateModule} from '@ngx-translate/core';

import {ContentRoutes} from './content.routing';
import {BlankComponent} from './blank/blank.component';
import {WidgetsModule} from '../../widgets/widgets.module';
import {MainComponent} from './main/main.component';
import {MaterialModule} from '../../shared/material.module';
import {SharedModule} from '../../shared/shared.module';
import {LogComponent} from './log/log.component';
import {NetfilterComponent} from './netfilter/netfilter.component';
import {ConfigComponent} from './config/config.component';
import {PluginsComponent, PluginInstallDialogComponent} from './plugins/plugins.component';
import {ProcessesComponent} from './processes/processes.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {FileInputAccessorModule} from 'file-input-accessor';
import {PluginComponent} from './plugin/plugin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContentRoutes),
    FileInputAccessorModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    NgxDatatableModule,
    FlexLayoutModule,
    NgMasonryGridModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    QuillModule,
    HttpClientModule,
    WidgetsModule
  ],
  declarations: [
    NgFileDropDirective,
    BlankComponent,
    MainComponent,
    LogComponent,
    ConfigComponent,
    NetfilterComponent,
    PluginsComponent,
    PluginComponent,
    ProcessesComponent,
    PluginInstallDialogComponent
  ],
  entryComponents: [
    PluginInstallDialogComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true, autoFocus: true, closeOnNavigation: true}}
  ]
})

export class ContentModule {
}
