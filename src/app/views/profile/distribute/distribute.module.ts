import { DistributeRoutes } from './distribute.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributeComponent } from './distribute.component';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [DistributeComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    FileUploadModule,
    RouterModule.forChild(DistributeRoutes)
  ]
})
export class DistributeModule { }
