import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from '../../shared/shared.module';
import {LicensingRoutes } from './licensing.routing';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FullLicensesComponent } from './full-licenses/full-licenses.component';
import { LicensingComponent } from './licensing/licensing.component';
import { RegisterTrackComponent } from './register-track/register-track.component';
import { HowToDistributeComponent } from './how-to-distribute/how-to-distribute.component';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StarRatingModule.forRoot(),
    NgxDatatableModule,
    RouterModule.forChild(LicensingRoutes),
    FileUploadModule,
    SharedModule,
    
  ],
  // exports: [
  //   NgxPaginationModule
  // ],
  declarations: [LicensingComponent, HowItWorksComponent, FullLicensesComponent, RegisterTrackComponent, HowToDistributeComponent],
  providers: [
  ]
})
export class LicensingModule {

}
