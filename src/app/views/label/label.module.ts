import { LabelComponent } from './label.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LabelRoutes } from './label.routing';



@NgModule({
  declarations: [LabelComponent],
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    RouterModule.forChild(LabelRoutes),
    FlexLayoutModule,
  ]
})
export class LabelModule { }
