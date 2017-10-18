import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MediaCardComponent } from './media-card/media-card.component';
import { FramedContentComponent } from './framed-content/frame-content.component';
import { SafePipe } from '../pipe/safe.pipe';
import { StopPropagationDirective } from '../directive/stop-propagation.directive';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    ChartsModule,
    FlexLayoutModule,
  ],
  declarations: [
    SafePipe,
    StopPropagationDirective,
    MediaCardComponent,
    FramedContentComponent
  ],
  exports: [
    MediaCardComponent,
    FramedContentComponent
  ]
})
export class WidgetsModule {
}
