import { CharityRoutes } from './charity.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CharityComponent } from './charity.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [CharityComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(CharityRoutes),
    FlexLayoutModule,

  ]
})
export class CharityModule { }
