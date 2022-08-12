import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { Theme } from '../../../shared/enums/theme.enum';
import { Sample } from '../../../shared/models/sample.model';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { AudioService } from '../../../shared/services/audio.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { LocalStoreService } from '../../../shared/services/local-store.service';
import { PlayStateControlService } from '../../../shared/services/play-state-control.service';
import { HttpService } from '../../../shared/services/web-services/http.service';
import { SampleLicensingMarketService } from '../../../views/sample-market/sample-licensing-market.service';
import { map, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
  animations: [egretAnimations],
})
export class PlaylistDetailComponent implements OnInit {


  private playState: boolean;

  count:number = 0;
  
  page: number = 1;
  pageSize: number = 12;
  sortBy: string = 'title';
  


  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private httpService: HttpService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private loader: AppLoaderService,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,

  ) { }

  ngOnInit(): void {



    this.sampleLicensingMarketService.samples$.pipe(
      // debounceTime(500),
      map((samples: Array<Sample>) => {
        if (this.playState) {
          this.playStateControlService.emitPlayState(false);
        }
        this.loader.close();
        if(samples.length > 0) {
          this.audioService.createWavesurferObj(Theme.PRIMARY);
          this.audioService.loadPlayAudio(samples[0].sampleID);
        }
        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Array<Sample>) => {
      if(samples.length > 0) {
        this.initCurrentFile(samples[0].sampleID);
      }
    });


    this.retrieveSamples();

  }

  public retrieveSamples(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.page, this.pageSize);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
    ).subscribe((response) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      console.log(samples);
      this.count = totalItems;
      this.sampleLicensingMarketService.samples$.next(samples);
      // this.dataSource = new MatTableDataSource(samples);
      
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.ls.clear();
          this.jwt.signin();
        }
      }
      console.log(error);
    });
  }

  initCurrentFile(sampleID: string) {
    // this.playStateControlService.saveIDCurrentPlayElement(sampleID);
    this.playStateControlService.emitCurrentSampleID(sampleID);
  }

}
