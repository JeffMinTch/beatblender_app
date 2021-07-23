import { EditAudioUnitComponent } from './../../../shared/components/dialogs/edit-audio-unit/edit-audio-unit.component';
import { AudioWebService } from './../../../shared/services/web-services/audio-web.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Theme } from 'app/shared/enums/theme.enum';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AudioService } from 'app/shared/services/audio.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { LocalStoreService } from 'app/shared/services/local-store.service';
import { PlayStateControlService } from 'app/shared/services/play-state-control.service';
import { HttpService } from 'app/shared/services/web-services/http.service';
import { SampleLicensingMarketService } from 'app/views/licensing/sample-licensing-market.service';
import { share } from 'rxjs/operators';
import { MyUploads } from 'app/shared/models/my-uploads.model';
import { MatDialog } from '@angular/material/dialog';
import { Sample } from 'app/shared/models/sample.model';
import { Track } from 'app/shared/models/track.model';
import { AudioUnitReplacement } from 'app/shared/models/audio-unit-replacement.model';

@Component({
  selector: 'app-audio-manager',
  templateUrl: './audio-manager.component.html',
  styleUrls: ['./audio-manager.component.scss']
})
export class AudioManagerComponent implements OnInit, AfterViewInit {

  @ViewChildren('expansionPanel') expansionPanels: QueryList<MatExpansionPanel>;

  private playState: boolean;
  panelOpenState = false;
  currentSampleID: string;
  page: number = 0;
  pageSize: number = 12;
  sortBy: string = 'title';
  count: number = 0;
  public myUploads: MyUploads;
  // public audioUnitDataType: typeof AudioUnitDataType = AudioUnitDataType;


  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private audioWebService: AudioWebService,
    private httpService: HttpService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private loader: AppLoaderService,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.playStateControlService.currentSampleID$.subscribe((currentSampleID) => {
      this.currentSampleID = currentSampleID;
    })



    this.loader.open();
    this.audioWebService.getUploads().subscribe((myUploads: MyUploads) => {
      this.myUploads = myUploads;
      console.log(myUploads);
      this.loader.close();
      // if (this.playState) {
      //   this.playStateControlService.emitPlayState(false);
      // }
      // if (myUploads.sampleList.length > 0) {
      //   this.audioService.createWavesurferObj(Theme.PRIMARY);
      //   this.audioService.loadPlayAudio(myUploads.sampleList[0].sampleID);
      //   this.initCurrentFile(myUploads.sampleList[0].sampleID);  
      // }
      this.audioService.initAudioPlayer(this.myUploads.sampleList.map((track) => track.audioUnit), Theme.BODY);
      this.playStateControlService.emitCurrentSampleID(this.myUploads.sampleList[0].audioUnit.audioUnitID);
      this.audioService.emitAudioUnits(this.myUploads.sampleList);
      this.audioService.emitAudioUnitsLoading(false);
      setTimeout(() => {
        this.expansionPanels.first.open();
      });
    });

    // this.sampleLicensingMarketService.samples$.pipe(
    //   // debounceTime(500),
    //   map((samples: Array<Sample>) => {
    //     if (this.playState) {
    //       this.playStateControlService.emitPlayState(false);
    //     }
    //     this.loader.close();
    //     if(samples.length > 0) {
    //       this.audioService.createWavesurferObj(Theme.PRIMARY);
    //       this.audioService.loadPlayAudio(samples[0].sampleID);
    //     }
    //     return samples;
    //   }),
    //   takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    // ).subscribe((samples: Array<Sample>) => {
    //   if(samples.length > 0) {
    //     this.initCurrentFile(samples[0].sampleID);
    //     setTimeout(() => {
    //       this.expansionPanels.first.open();
    //     });
    //   }
    // });

    // this.retrieveSamples();

  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }



  public retrieveSamples(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.page, this.pageSize);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
    ).subscribe((response) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
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

  initCurrentFile(sampleID: string) {
    // this.playStateControlService.saveIDCurrentPlayElement(sampleID);
    this.playStateControlService.emitCurrentSampleID(sampleID);
  }

  openEditAudioUnitDialog(audioUnit: Sample | Track, audioUnitDataType) {
    const dialogRef = this.dialog.open(EditAudioUnitComponent, {
      width: '500px',
      data: {
        // title: this.getTitle(audioUnitDataType),
        // firstParagraph: this.getFirstParagraph(audioUnitDataType),
        // inputLabel: 'Enter Your New Artist Pseudonym',
        audioUnitDataType: audioUnitDataType,
        audioUnit: audioUnit
        // inputValue: '',
        // submitButton: 'Save',
        // cancelButton: 'No Thanks'
      },
      // data: this.formsMap.get(item).controls['mixedIns'].value,
      hasBackdrop: false,

    });

    dialogRef.afterClosed().subscribe((audioUnitReplacement: AudioUnitReplacement) => {
      this.findReplace(audioUnitReplacement);
    });


  }

  findReplace(audioUnitReplacement: AudioUnitReplacement) {
    var index = this.myUploads.sampleList.indexOf(audioUnitReplacement.deprecatedAudioUnit as Sample);

    if (index !== -1) {
      this.myUploads.sampleList[index] = audioUnitReplacement.updatetAudioUnit as Sample;
    }
  }


}
