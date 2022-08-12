import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioComponent } from './audio.component';
import { RouterModule } from '@angular/router';
import { AudioRoutes } from './audio.routing'
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [AudioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AudioRoutes),
    FlexLayoutModule,
    SharedModule,
  ]
})
export class AudioModule { }


