import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Theme } from 'app/shared/enums/theme.enum';
import { SamplePage } from 'app/shared/models/sample-page.model';
import { Sample } from 'app/shared/models/sample.model';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AudioService } from 'app/shared/services/audio.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { MatchMediaService } from 'app/shared/services/match-media.service';
import { PlayStateControlService } from 'app/shared/services/play-state-control.service';
import { AudioWebService } from 'app/shared/services/web-services/audio-web.service';
import { HttpService } from 'app/shared/services/web-services/http.service';
import { LicenseWebService } from 'app/shared/services/web-services/license-web.service';
import { SampleLicensingMarketService } from 'app/views/sample-market/sample-licensing-market.service';
import { map, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
  animations: egretAnimations

})
export class ProfileOverviewComponent implements OnInit {

  pageNo: number = 0;
  pageSize: number = 30;
  sortBy: string = 'title';
  count: number = 0;

  activityData = [{
    month: 'January',
    spent: 240,
    opened: 8,
    closed: 30
  }, {
    month: 'February',
    spent: 140,
    opened: 6,
    closed: 20
  }, {
    month: 'March',
    spent: 220,
    opened: 10,
    closed: 20
  }, {
    month: 'April',
    spent: 440,
    opened: 40,
    closed: 60
  }, {
    month: 'May',
    spent: 340,
    opened: 40,
    closed: 60
  }];

  tasks = [{
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }
]

  tickets = [{
    img: 'assets/images/face-1.jpg',
    name: 'Mike Dake',
    text: 'Excerpt pipe is used.',
    date: new Date('07/12/2017'),
    isOpen: true
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Doe',
    text: 'My dashboard is not working.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-3.jpg',
    name: 'Jhonson lee',
    text: 'Fix stock issue',
    date: new Date('04/10/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-4.jpg',
    name: 'Mikie Jyni',
    text: 'Renew my subscription.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Dake',
    text: 'Payment confirmation.',
    date: new Date('04/10/2017'),
    isOpen: false
  }]

  

  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private loader: AppLoaderService,
    private changeDetectorRef: ChangeDetectorRef,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
    private audioWebService: AudioWebService,
    private licenseWebService: LicenseWebService,
    private fb: FormBuilder,
    private layout: LayoutService,
    private matchMedia: MatchMediaService,
    public dialog: MatDialog,
    private router: Router,
    private httpService: HttpService,
    private activeRoute: ActivatedRoute,
  ) { 

    this.sampleLicensingMarketService.samples$.pipe(
      map((samples: Array<Sample>) => {
        this.loader.close();
        this.audioService.initAudioPlayer(samples.map(sample => sample.audioUnit), Theme.ACCENT);
        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Array<Sample>) => {
      console.log(samples);
      // if (samples.length > 0) {
      //   this.initCurrentFile(samples[0].audioUnit.audioUnitID);
      // }
    });

    this.retrieveSamples();

  }

  ngOnInit() {
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
          this.ls.clear();
          this.jwt.signin();
        }
      }
      console.log(error);
    });
  }

  // handlePageChange(pageNo: number) {
  //   console.log(pageNo);
  //   this.pageNo = pageNo;
  //   this.applyFilter(this.pageNo - 1, this.searchFilterFormMap);
  //   // this.retrieveSamples();
  // }

  // changePage(pageNo: number) {
  //   this.pageNo = pageNo;
  //   this.initSearchFilterFormMap(this.selectionList, this.minMaxList);

  // }

  changeCount(count: number) {
    this.count = count;
  }

}
