import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { PlayStateControlService } from './../../services/play-state-control.service';
import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AudioService } from 'app/shared/services/audio.service';
import { AudioState } from 'app/shared/models/audio-state.model';
import { AudioUnit } from 'app/shared/models/audio-unit.model';
import { ClickEvent } from 'angular-star-rating';

export type AudioPanelType = 'primary' | 'sample' | 'playlist' | 'iconButton';

@Component({
  selector: 'app-audio-panel',
  templateUrl: './audio-panel.component.html',
  styleUrls: ['./audio-panel.component.scss']
})
export class AudioPanelComponent implements OnInit {

  @Input() audioUnit: AudioUnit;
  @Input() type: AudioPanelType;
  @Input() triggerAudioBy: 'panel' | 'button' = 'panel';
  @Output() downloadEvent = new EventEmitter();

  public playState: boolean;
  public currentSampleID: string;

  constructor(
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private changeDetectorRef: ChangeDetectorRef,
    // private jwt: JwtAuthService
    ) { }


    ngAfterViewInit() {
      setTimeout(() => {
        console.log(this.audioUnit);
      }, 5000);
      // console.log(this.sample);

    }

  ngOnInit(): void {

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

  downloadBasicLicense(): void {
    this.downloadEvent.emit();
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
  
  // disableDownloadButton() {
  //   const userID = this.jwt.getUserInfo().sub;
  //   this.sample.
  // }

}
