import { DownloadSampleComponent } from './download-sample/download-sample.component';
import { SharedModule } from '../../shared/shared.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { SampleMarketRoutes } from './sample-market.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { SampleMarketComponent } from './sample-market.component';

import { RouterModule } from '@angular/router';
// import { SharedModule } from 'app/shared/shared.moduke';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { BasicLicenseSidenavComponent } from './basic-license-sidenav/basic-license-sidenav.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';
import { FindAllComponent } from './find-all/find-all.component';



@NgModule({
  declarations: [SampleMarketComponent, DownloadSampleComponent, BasicLicenseSidenavComponent, ChooseCategoryComponent, ChooseArtistComponent, FindAllComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SampleMarketRoutes),
    FlexLayoutModule,
    SharedModule,
    NgxPaginationModule,
    // PaginatePipe
    // NgxPaginationModule,

    // PaginatePipe
  ],
})
export class SampleMarketModule { }
