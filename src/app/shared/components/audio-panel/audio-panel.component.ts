import { LicenseType } from './../../models/types/license-type.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayStateControlService } from './../../services/play-state-control.service';
import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AudioService } from 'app/shared/services/audio.service';
import { AudioState } from 'app/shared/models/audio-state.model';
import { AudioUnit } from 'app/shared/models/audio-unit.model';
import { Sample } from 'app/shared/models/sample.model';
import { Track } from 'app/shared/models/track.model';
import { environment } from 'environments/environment';

export type AudioPanelType = 'primary' | 'sample' | 'playlist' | 'iconButton' | 'release';

@Component({
  selector: 'app-audio-panel',
  templateUrl: './audio-panel.component.html',
  styleUrls: ['./audio-panel.component.scss']
})
export class AudioPanelComponent implements OnInit, AfterViewInit {

  // @Input() audioUnit: AudioUnit;
  // @Input() title: string;
  // @Input() 

  @Input() sample: Sample;
  @Input() track: Track;

  
  audioUnit: AudioUnit;

  @Input() type: AudioPanelType;
  @Input() triggerAudioBy: 'panel' | 'button' = 'panel';
  @Input() button: boolean = true;
  @Input() buttonText: string = 'Get a License';
  @Input() secondButtonText: string;

  @Input() light: boolean = false;
  @Output() clickEvent = new EventEmitter();
  @Output() secondButtonClickEvent = new EventEmitter();

  private IMAGE = environment.apiURL.baseUrl + environment.apiURL.mediaPath.public.root + environment.apiURL.mediaPath.public.image;



  public playState: boolean;
  public currentSampleID: string;

  constructor(
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    ) { }


    ngAfterViewInit() {
      if(this.sample) {
        this.audioUnit = this.sample.audioUnit;
      } else if(this.track) {
        this.audioUnit = this.track.audioUnit;
      } else {
        throw new Error("No Sample or Track provided");
      }
      // setTimeout(() => {
      //   console.log(this.audioUnit);
      // }, 5000);
      // console.log(this.sample);



    }

  ngOnInit(): void {
    if(this.sample) {
      this.audioUnit = this.sample.audioUnit;
    } else if(this.track) {
      this.audioUnit = this.track.audioUnit;
    } else {
      throw new Error("No Sample or Track provided");
    }

    

    this.playStateControlService.playState$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((playState: boolean) => {
      this.playState = playState;
    });
    this.playStateControlService.currentSampleID$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((currentSampleID: string) => {
      this.currentSampleID = currentSampleID;
    });

    this.audioService.audioState$.pipe(takeUntil(this.audioService.audioServiceDestroyed$)).subscribe((state: AudioState) => {
      switch (state.status) {
        case 'finish':
          this.changeDetectorRef.detectChanges();
          break;
        case 'playing':
          break;
        case 'pause':
          this.changeDetectorRef.detectChanges();
          break;
      }
    });



  }

  play(isCurrentSample: boolean, audioUnitID: string): void {
    if (isCurrentSample) {
      this.playStateControlService.emitPlayState(true);
      this.audioService.play();
      console.log('play yes');
    } else {
      this.playStateControlService.emitPlayState(true);
      this.audioService.loadPlayAudio(audioUnitID);
      // setTimeout(() => {
      this.playStateControlService.emitCurrentSampleID(audioUnitID);
      // });
      console.log('play no');
    }
  }

  pause(isCurrentSample: boolean, audioUnitID: string): void {
    if (isCurrentSample) {
      this.playStateControlService.emitPlayState(false);
      this.audioService.pause();
      console.log('pause yes');
    } else {
      this.playStateControlService.emitCurrentSampleID(audioUnitID);
      this.audioService.loadPlayAudio(audioUnitID);
      console.log('pause no');

    }

  }

  throwClickEvent(): void {
    this.clickEvent.emit();
  }

  triggerToolbar() {
    if(this.triggerAudioBy === 'panel') {
      if(this.playState) {
        // return true;
        this.pause(this.audioUnit.audioUnitID === this.currentSampleID, this.audioUnit.audioUnitID)
      } else {
        this.play(this.audioUnit.audioUnitID === this.currentSampleID, this.audioUnit.audioUnitID)
        // return false;
      }
       
    } else {
      // event.preventDefault();
    }
  }

  triggerPlayButton(event: Event) {
    // alert("playbutton pressed");
    if(this.triggerAudioBy === 'button') {
      event.stopPropagation();
      if(this.playState) {
        // return true;
        this.pause(this.audioUnit.audioUnitID === this.currentSampleID, this.audioUnit.audioUnitID)
      } else {
        this.play(this.audioUnit.audioUnitID === this.currentSampleID, this.audioUnit.audioUnitID)
        // return false;
      }
    }
  } 
  
  stopPropagation(event: Event) {
    event.stopPropagation();
    if(this.router.url.startsWith('/sample-market')) {
      this.router.navigate(['download', this.currentSampleID]);
    } else {
      this.throwClickEvent();
    }

  }

  // getLicenseType(audioUnit: AudioUnit) {
  //   switch(audioUnit.licenseType) {
  //     case 'BB100':
  //       return 'BB-100';
  //     case 'BB70':
  //       return 'BB-70';
  //     case 'BB30':
  //       return 'BB-30'
  //   }
  // }

  routeToArtistProfile(event: Event) {
    event.stopPropagation();
      this.router.navigate(['sample-market', this.audioUnit.artistAlias.artistName, this.audioUnit.artistAlias.artistALiasID]);
  }

  getImage() {
    return `${this.IMAGE}/${this.audioUnit.audioUnitID}`;
  }

}
