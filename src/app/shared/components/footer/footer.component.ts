import { takeUntil } from 'rxjs/operators';
import { ComponentCommunicationService } from './../../services/component-communication.service';
import { SampleLicensingMarketService } from '../../../views/licensing/sample-licensing-market.service';
import { PlayStateControlService } from './../../services/play-state-control.service';
import { Subscription } from 'rxjs';
import { AudioService } from './../../services/audio.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AudioState } from 'app/shared/models/audio-state.model';
import { AudioUnit } from 'app/shared/models/audio-unit.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, AfterViewInit {

  // private samples: Array<Sample>;
  private currentAudioUnitID: string;
  isMuted: boolean = false;
  audioStateSubscription: Subscription;
  sampleSubscription: Subscription;
  // samples$: Observable<Sample[]>;
  audioLoadCompleteSubscription: Subscription;
  public initIcons: boolean = false;
  public audioUnits: Array<AudioUnit>; 

  constructor(
    public audioService: AudioService,
    public playStateControlService: PlayStateControlService,
    public changeDetectorRef: ChangeDetectorRef,
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private componentCommunicationService: ComponentCommunicationService,
    ) {

    this.audioStateSubscription = this.audioService.audioState$.pipe(
      takeUntil(this.audioService.audioServiceDestroyed$)
    ).subscribe((state: AudioState) => {
      switch (state.status) {
        case "finish":
          this.changeDetectorRef.detectChanges();
          break;
        case "playing":
          break;
      }
    });

    this.audioLoadCompleteSubscription = this.componentCommunicationService.audioLoadCompleteEvent$.pipe(
      takeUntil(this.audioService.audioServiceDestroyed$)
    ).subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });

    // this.sampleLicensingMarketService.samples$.pipe(
    //   takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$)
    // ).subscribe((samples: Array<Sample>) => {
    //   this.samples = samples;
    //   // this.changeDetectorRef.detectChanges();
    // });

    this.audioService.audioUnits$.subscribe((audioUnits) => {
      this.audioUnits = audioUnits;
    });

   

    this.playStateControlService.currentSampleID$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((currentAudioUnitID: string) => {
      this.currentAudioUnitID = currentAudioUnitID;
      // this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initIcons = true;

  }

  ngOnChanges() {
    // this.changeDetectorRef.detectChanges();
  }

  play() {
    // this.playStateControlService.savePlayState(true);
    this.playStateControlService.emitPlayState(true);
    this.audioService.play();
    this.changeDetectorRef.detectChanges();
  }

  pause() {
    // this.playStateControlService.savePlayState(false);
    this.playStateControlService.emitPlayState(false);
    this.audioService.pause();
    this.changeDetectorRef.detectChanges();
  }

  isSamples(): boolean {
    if (this.sampleLicensingMarketService.getSamplePage()) {
      return false;
    } else {
      return true;
    }
  }

  previousNext(buttonName) {
    let newActiveAudioUnitIndex: number;
    const activeAudioUnitIndex: number = this.audioUnits.findIndex(audioUnit => audioUnit.audioUnitID === this.currentAudioUnitID);
    switch (buttonName) {
      case 'prev':
        newActiveAudioUnitIndex = activeAudioUnitIndex - 1;
        break;
      case 'next':
        newActiveAudioUnitIndex = activeAudioUnitIndex + 1;
        break;
    }
    this.loadAudio(this.audioUnits[newActiveAudioUnitIndex].audioUnitID);
    this.playStateControlService.emitCurrentSampleID(this.audioUnits[newActiveAudioUnitIndex].audioUnitID);
    // this.playStateControlService.saveIDCurrentPlayElement(this.samples[newActiveSampleIndex].sampleID);
    this.changeDetectorRef.detectChanges();
  }

  findSampleIndex(audioUnits: AudioUnit[]): number {
    const activeAudioUnit: AudioUnit = audioUnits.find(audioUnit => audioUnit.audioUnitID === this.playStateControlService.getIDCurrentPlayElement())
    const activeAudioUnitIndex: number = audioUnits.findIndex(audioUnit => audioUnit === activeAudioUnit);
    return activeAudioUnitIndex;
  }

  loadAudio(audioUnitID: string):void {
    this.audioService.loadAudio(audioUnitID);
  }

  isFirst(): boolean {
    if (this.audioUnits) {
      if (this.audioUnits.findIndex(audioUnit => audioUnit.audioUnitID === this.currentAudioUnitID)===0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
    // if (this.sampleLicensingMarketService.getSamples()) {
    //   const activeSampleIndex: number = this.findSampleIndex(this.sampleLicensingMarketService.getSamples());
    //   return activeSampleIndex === 0;
    // } else {
    //   return false;
    // }
  }

  isLast():boolean {
    if(this.audioUnits) {
      if(this.audioUnits.findIndex(audioUnit => 
        audioUnit.audioUnitID === this.currentAudioUnitID) === this.audioUnits.length -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  getMute(): boolean {
    if (this.audioService.isPlayerReady) {
      return this.audioService.getMute();
    } else {
      return false;
    }
  }

  toggleMute() {
    if (this.audioService.isPlayerReady) {
      this.audioService.toggleMute();
    }
  }

}
