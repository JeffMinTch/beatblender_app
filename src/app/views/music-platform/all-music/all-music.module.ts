import { NgxPaginationModule } from 'ngx-pagination';
import { ArtistCardComponent } from './../../../shared/components/artist-card/artist-card.component';
import { AllMusicRoutes } from './all-music.routing';
import { SharedModule } from './../../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMusicComponent } from './all-music.component';
import { RouterModule } from '@angular/router';
import { GenresModule } from '../genres/genres.module';
import { GenresComponent } from '../genres/genres.component';



@NgModule({
  declarations: [AllMusicComponent, ArtistCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(AllMusicRoutes),
    SharedModule,
    NgxPaginationModule,
  ]
})
export class AllMusicModule { }
