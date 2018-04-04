import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app/shared/material.module';
import {LazyComponent} from './lazy.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LazyComponent,
  ],
  entryComponents: [
    LazyComponent
  ]
})

export class LazyModule {
}
