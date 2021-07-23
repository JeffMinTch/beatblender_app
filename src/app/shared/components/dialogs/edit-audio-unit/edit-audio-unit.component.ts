import { AudioWebService } from './../../../services/web-services/audio-web.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IEditAudioUnitData } from './../../../models/edit-audio-unit-data.model';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AudioUnitDataType } from 'app/shared/models/audio-unit-data-type.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Sample } from 'app/shared/models/sample.model';
import { Track } from 'app/shared/models/track.model';
import { AudioUnitReplacement } from 'app/shared/models/audio-unit-replacement.model';



@Component({
  selector: 'app-edit-audio-unit',
  templateUrl: './edit-audio-unit.component.html',
  styleUrls: ['./edit-audio-unit.component.scss']
})
export class EditAudioUnitComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  formGroup: FormGroup;
  minimumBPM: 0;
  maximumBPM: 300;
  minimumTags = 5;
  maximumTags = 10;
  minimumMoods = 1;
  maximumMoods = 3;
  genreList: string[] = ['Blues', 'Classical', 'Country', 'Electronic', 'Hip Hop/Rap', 'Jazz', 'Latin', 'Pop', 'RnB/Soul', 'Reggea', 'Rock', 'Spoken Word'];
  moodsList: string[] = ['ambient', 'angry', 'bouncy', 'calming', 'carefree', 'cheerful', 'cold', 'complex', 'cool', 'dark', 'disturbing', 'dramatic', 'dreamy', 'eerie', 'elegant', 'energetic', 'enthusiastic', 'epic', 'fun', 'funky', 'futuristic', 'gentle', 'gleeful', 'gloomy', 'groovy', 'happy', 'harsh', 'haunting', 'humorous', 'hypnotic', 'industrial', 'intense', 'intimate', 'joyous', 'laid-back', 'light', 'lively', 'manic', 'mellow', 'mystical', 'ominous', 'passionate', 'pastoral', 'peaceful', 'playful', 'poignant', 'quiet', 'rebellious', 'reflective', 'romantic', 'rowdy', 'sad', 'sentimental', 'sexy', 'smooth', 'soothing', 'sophisticated', 'spacey', 'spiritual', 'strange', 'sweet', 'theater', 'trippy', 'warm', 'whimsical'];
  // public audioUnitDataType: typeof AudioUnitDataType = AudioUnitDataType;
  isLoading: boolean = false;
  // spinnerColor: ThemePalette;

  constructor(
    public dialogRef: MatDialogRef<EditAudioUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditAudioUnitData,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private audioWebService: AudioWebService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({});

    let formControl: FormControl;
    switch (this.data.audioUnitDataType) {
      case 'title':
        formControl = new FormControl(this.data.audioUnit.audioUnit.title);
        break;
      case 'tempo':
        formControl = new FormControl(this.data.audioUnit.audioUnit.tempo, [
          Validators.required,
          Validators.min(this.minimumBPM),
          Validators.max(this.maximumBPM)]);
        break;
      case 'genre':
        formControl = new FormControl(this.data.audioUnit.audioUnit.genre);
        break;
      case 'moods':
        formControl = new FormControl(this.data.audioUnit.audioUnit.moods, [
          Validators.required,
          Validators.minLength(this.minimumMoods),
          Validators.maxLength(this.maximumMoods)]);
        break;
      // case AudioUnitDataType.Tempo:
      //   return 'tempo';
      case 'tags':
        formControl = new FormControl(this.data.audioUnit.audioUnit.tags, [
          Validators.required,
          Validators.minLength(this.minimumTags),
          Validators.maxLength(this.maximumTags)
        ]);
        break;


      default:
        throw new Error("Wrong AudioUnitType provided");
    }
    this.formGroup.addControl(this.data.audioUnitDataType, formControl);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTitle(audioUnitDataType: AudioUnitDataType): string {
    switch (audioUnitDataType) {
      case 'title':
        return 'Title';
      case 'genre':
        return 'Genre';
      case 'moods':
        return 'Moods';
      case 'tempo':
        return 'Tempo';
      case 'tags':
        return 'Tags';
      default:
        throw new Error("Wrong AudioUnitDataType provided");
    }
  }

  getFirstParagraph(audioUnitDataType: AudioUnitDataType): string {
    switch (audioUnitDataType) {
      case 'title':
        return 'Type in the title under which you want to upload the sample.';
      case 'genre':
        return 'Type in the genre under which you want to upload the sample.';
      case 'moods':
        return 'Type in the genres that fit best to your upload.';
      case 'tempo':
        return 'What tempo does your music have?';
      case 'tags':
        return 'Edit Tags that describe your sample best.';
      default:
        throw new Error("Wrong AudioUnitType provided");
    }
  }

  isFormControl(audioUnitDataType: AudioUnitDataType) {
    if (audioUnitDataType === this.data.audioUnitDataType) {
      return true;
    } else {
      return false;
    }
  }


  // https://stackblitz.com/edit/angular-material-v9-mat-select-with-mat-chip-list?file=src%2Fapp%2Fselect-multiple-example.html
  onMoodRemoved(mood: string): void {
    // const formGroup: FormGroup = this.formsMap.get(item);
    const selectedMoods: string[] = (this.formGroup.controls['moods'].value as string[]);
    //  this.toppingsControl.value as string[];
    this.removeFirst(selectedMoods, mood);
    (this.formGroup.controls['moods'].setValue(selectedMoods)); // To trigger change detection
  }

  onTagRemoved(tag: string): void {
    // const formGroup: FormGroup = this.formsMap.get(item);
    const selectedMoods: string[] = (this.formGroup.controls['tags'].value as string[]);
    //  this.toppingsControl.value as string[];
    this.removeFirst(selectedMoods, tag);
    (this.formGroup.controls['tags'].setValue(selectedMoods)); // To trigger change detection
  }

  add(event: MatChipInputEvent): void {
    // const formGroup: FormGroup = this.formsMap.get(fileItem);
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      (this.formGroup.controls['tags'].value.push(value.trim()));
    }
    this.formGroup.updateValueAndValidity();
    this.changeDetectorRef.detectChanges();
    // Reset the input value
    if (input) {
      input.value = '';
    }
    // setTimeout(() => {
    const selectedTags: string[] = (this.formGroup.controls['tags'].value as string[]);
    this.formGroup.controls['tags'].setValue(selectedTags); // To trigger change detection
    console.log('Chip added');
    (this.formGroup.controls['tags'].markAsTouched);
    // this.changeDetectorRef.detectChanges();
    // },1000);

  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  public updateAttribute(
    audioUnitDataType: AudioUnitDataType,
    // value: any
  ) {
    const value: any = this.formGroup.controls[this.data.audioUnitDataType].value;
    switch (audioUnitDataType) {
      case 'title':
        this.updateTitle(value)
        break;
      case 'genre':
        this.updateGenre(value);
        break;
      case 'tempo':
        this.updateTempo(value);
        break;
      case 'moods':
        break;
      case 'tags':
        break;
      default:
        throw new Error("Wrong AudioUnitType Provided");
    }
  }


  updateTitle(newTitle: string) {
    this.isLoading = true;
    this.audioWebService.updateTitle(newTitle, this.data.audioUnit.audioUnit).subscribe((updatedAudioUnit: Sample | Track) => {
      let that = this;
      setTimeout(() => {
        that.isLoading = false;
        that.dialogRef.close(new AudioUnitReplacement(that.data.audioUnit, updatedAudioUnit));
      }, 3000);
    });
  }

  updateTempo(newTempo: number) {
    this.isLoading = true;
      this.isLoading = true;
    this.audioWebService.updateTempo(newTempo, this.data.audioUnit.audioUnit).subscribe((updatedAudioUnit: Sample | Track) => {
      this.isLoading = false;
      this.dialogRef.close(new AudioUnitReplacement(this.data.audioUnit, updatedAudioUnit));
    });
  }

  updateGenre(newGenre: string) {
    this.isLoading = true;
    this.audioWebService.updateTitle(newGenre, this.data.audioUnit.audioUnit).subscribe((updatedAudioUnit: Sample | Track) => {
      this.isLoading = false;
      this.dialogRef.close(new AudioUnitReplacement(this.data.audioUnit, updatedAudioUnit));
    });
  }

  // updateTitle(newTitle: string) {
  //   this.audioWebService.updateTitle(newTitle);
  // }

  // updateTitle(newTitle: string) {
  //   this.audioWebService.updateTitle(newTitle);
  // }

}
