import { SampleLicensingMarketService } from '../../sample-market/sample-licensing-market.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'app/shared/enums/theme.enum';
import { AudioUnit } from 'app/shared/models/audio-unit.model';
import { Sample } from 'app/shared/models/sample.model';
import { AudioService } from 'app/shared/services/audio.service';
import { AudioWebService } from 'app/shared/services/web-services/audio-web.service';
import { map, share, takeUntil } from 'rxjs/operators';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { PlayStateControlService } from 'app/shared/services/play-state-control.service';
import { HttpService } from 'app/shared/services/web-services/http.service';
import { SamplePage } from 'app/shared/models/sample-page.model';
import { HttpErrorResponse } from '@angular/common/http';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [egretAnimations],

})
export class DetailsComponent implements OnInit {

  public sample: Sample = null;
  public samples: Array<Sample> = null;
  public viewMode = 'grid-view';

  pageNo: number = 0;
  pageSize: number = 3;
  sortBy: string = 'title';
  count: number = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private audioWebService: AudioWebService,
    private audioService: AudioService,
    private router: Router,
    private sampleLicensingMarketService: SampleLicensingMarketService,
    private loader: AppLoaderService,
    public playStateControlService: PlayStateControlService,
    private httpService: HttpService


  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.audioWebService.getSample(params['id']).subscribe((sample: Sample) => {
        this.sample = sample;
        this.audioService.initAudioPlayer(new Array<AudioUnit>(sample.audioUnit),Theme.ACCENT);
      })
    });

    this.sampleLicensingMarketService.samples$.pipe(
      map((samples: Array<Sample>) => {
        this.loader.close();
        this.audioService.initAudioPlayer(samples.map(sample => sample.audioUnit), Theme.ACCENT);
        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Array<Sample>) => {
      console.log(samples);
      this.samples = samples;
      if (samples.length > 0) {
        this.initCurrentFile(samples[0].audioUnit.audioUnitID);
      }
    });
    this.retrieveSamples();
  }

  initCurrentFile(audioUnitID: string) {
    // this.playStateControlService.saveIDCurrentPlayElement(sampleID);
    this.playStateControlService.emitCurrentSampleID(audioUnitID);
  }

  public retrieveSamples(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.pageNo, this.pageSize);
    this.audioService.emitAudioUnitsLoading(true);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
      map((res: SamplePage) => { return res })
    ).subscribe((response: SamplePage) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
      this.audioService.emitAudioUnitsLoading(false);
      this.sampleLicensingMarketService.samples$.next(samples);

    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          // this.ls.clear();
          // this.jwt.signin();
        }
      }
      console.log(error);
    });
  }

  redirectToTermsAndConditions(sample: Sample) {
    this.router.navigate(['download', sample.audioUnit.audioUnitID]);
  }

  

}
