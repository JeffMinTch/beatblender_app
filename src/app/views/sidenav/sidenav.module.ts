import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutes, } from './sidenav.routing';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SidenavRoutes),
    FlexLayoutModule,
    SharedModule,
  ]
})
export class SidenavModule { }
