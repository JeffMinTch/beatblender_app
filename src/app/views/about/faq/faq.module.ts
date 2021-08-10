import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import {FaqRoutes} from './faq.routing';



@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild(FaqRoutes)
  ]
})
export class FaqModule { }
