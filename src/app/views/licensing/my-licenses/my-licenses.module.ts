import { MyLicensesComponent } from './my-licenses.component';
import { MyLicensesRoutes } from './my-licenses.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { BasicLicensesComponent } from './basic-licenses/basic-licenses.component';
import { ExtendedLicensesComponent } from './extended-licenses/extended-licenses.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';



@NgModule({
  declarations: [MyLicensesComponent, BasicLicensesComponent, ExtendedLicensesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MyLicensesRoutes),
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule
  ]
})
export class MyLicensesModule { }
