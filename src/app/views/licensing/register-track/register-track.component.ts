import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OAuthService } from 'angular-oauth2-oidc';
import { SelectMixedinsDialogComponent } from '../../../shared/components/dialogs/select-mixedins-dialog/select-mixedins-dialog.component';
import { Theme } from '../../../shared/enums/theme.enum';
import { AudioState } from '../../../shared/models/audio-state.model';
import { Sample } from '../../../shared/models/sample.model';
import { AudioService } from '../../../shared/services/audio.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { PlayStateControlService } from '../../../shared/services/play-state-control.service';
import { environment } from '../../../../environments/environment';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-track',
  templateUrl: './register-track.component.html',
  styleUrls: ['./register-track.component.scss']
})
export class RegisterTrackComponent implements OnInit {

  public formGroup: FormGroup;
  public formsSubject: ReplaySubject<FormGroup> = new ReplaySubject<FormGroup>();

  private uploadOptions: FileUploaderOptions;
  private imageUploadOptions: FileUploaderOptions;
  private uploadUrl: string;
  public uploader: FileUploader;
  public imageUploader: FileUploader;
  public hasBaseDropZoneOver = true;

  playState: boolean;
  public currentSampleSubject$: BehaviorSubject<number>;
  currentSampleIndex: number;

  public userData: any;






  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    // private oauthService: OAuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private jwt: JwtAuthService,
    private router: Router






  ) {
    this.uploadUrl = `${environment.apiURL.baseUrl}${environment.apiURL.audioPath.protected.root}${environment.apiURL.audioPath.protected.registerTrack}`;
    // // https://stackoverflow.com/questions/60303518/angular-ng2-file-upload-input-file-filter-not-working-for-png-in-internet-explor
    this.uploadOptions = {
      url: this.uploadUrl,
      authToken: 'Bearer ' + jwt.getJwtToken(),
      allowedMimeType: ['audio/wav', 'audio/mp3', 'audio/mpeg'],
      allowedFileType: ['audio'],
      // 500 MB max
      maxFileSize: 500 * 1024 * 1024
    };

    this.imageUploadOptions = {
      url: this.uploadUrl,
      allowedMimeType: ['image/jpeg', 'image/png', 'image/gif'],
      allowedFileType: ['image'],
      // 100 MB max
      maxFileSize: 100 * 1024 * 1024
    };
    this.uploader = new FileUploader(this.uploadOptions);
    this.imageUploader = new FileUploader(this.imageUploadOptions);

    // this.formsMap = new Map<FileItem, FormGroup>();
    // this.formsSubject = new ReplaySubject<Map<FileItem, FormGroup>>();
    this.currentSampleSubject$ = new BehaviorSubject<number>(0);

    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

    this.playStateControlService.playState$.pipe(
      takeUntil(this.playStateControlService.playStateServiceDestroyed$)
    ).subscribe((playState: boolean) => {
      this.playState = playState;
    });

    this.currentSampleSubject$.subscribe((index: number) => {
      this.currentSampleIndex = index;
    });

    this.audioService.audioState$.pipe(takeUntil(this.audioService.audioServiceDestroyed$)).subscribe((state: AudioState) => {
      switch (state.status) {
        case 'finish':
          this.changeDetectorRef.detectChanges();
          break;
        case 'playing':
          break;
      }
    });

    // this.oauthService.events
    //   .pipe(filter((e: any) => {
    //     console.log(e);

    //     return e.type === 'token_refreshed';
    //   }))
    //   .subscribe(() => {
    //     console.log('Acces Token changed in FileUploadOptions');
    //     // setTimeout(() => {
    //     this.uploadOptions.authToken = 'Bearer ' + this.jwt.getJwtToken();
    //     this.uploader.setOptions(this.uploadOptions);
    //     // this.uploadOptions.headers = [{ name: 'x-ms-blob-type', value : 'BlockBlob' }];
    //     // },1000);
    //   });
  }

  ngOnInit(): void {
    this.buildFileItemForm();
    this.formsSubject.next(this.formGroup);
    this.playStateControlService.emitPlayState(false);
    this.uploader.onBuildItemForm = (fileItem: FileItem, formData: FormData) => {
      // https://stackoverflow.com/questions/60303518/angular-ng2-file-upload-input-file-filter-not-working-for-png-in-internet-explor
      // this.uploadOptions = {
      //   url: this.uploadUrl,
      //   authToken: 'Bearer ' + this.jwt.getJwtToken(),
      //   allowedMimeType: ['audio/wav', 'audio/mp3', 'audio/mpeg'],
      //   allowedFileType: ['audio'],
      //   //500 MB max
      //   maxFileSize: 500 * 1024 * 1024
      // }
      // this.uploadOptions.authToken = 'Bearer ' + this.jwt.getJwtToken();
      console.log(this.uploadOptions);
      console.log(fileItem);
      // console.log(((this.formGroup.controls['image'] as FormGroup).controls['file'].value as FileItem)._file);
      console.log('Yuhee');
      // tslint:disable-next-line:max-line-length
      // formData.append('audioUnitType', 'Sample');
      formData.append('image', ((this.formGroup.controls['image'] as FormGroup).controls['file'].value as FileItem)._file); // note comma separating key and value
      // formData.append('someField2', 'testValue1');
      // const formGroup: FormGroup = this.formsMap.get(fileItem);
      formData.append('releaseArtistName', this.formGroup.controls['releaseArtistName'].value);
      formData.append('releaseTitle', this.formGroup.controls['releaseTitle'].value);
      formData.append('licenseeName', this.formGroup.controls['licenseeName'].value);

      (this.formGroup.controls['mixedIns'].value as Array<Sample>).map(sample => sample.sampleID).forEach((sampleId: string) => {
        // this.console.log(sampleId);
        formData.append('mixedIns', sampleId);
      });

      // formData.append('artistAlias', (formGroup.controls['artistPseudonymGroup'] as FormGroup).controls['artistPseudonym'].value);
      // formData.append('licenseType', (formGroup.controls['licenseTypeGroup'] as FormGroup).controls['licenseType'].value.abbreviation);
      // formData.append('genre', (formGroup.controls['descriptionForm'] as FormGroup).controls['genre'].value as string);
      // ((formGroup.controls['descriptionForm'] as FormGroup).controls['moods'].value as string[]).forEach((mood) => {
      //     formData.append('moods', mood);
      // });
      // ((formGroup.controls['descriptionForm'] as FormGroup).controls['tags'].value as string[]).forEach((tag) => {
      //     formData.append('tags', tag);
      // });
      // formData.append('sampleTitle', (formGroup.controls['descriptionForm'] as FormGroup).controls['sampleTitle'].value as string);
      // formData.append('tempo'k, (formGroup.controls['descriptionForm'] as FormGroup).controls['tempo'].value);
      // formData.append('genre', (formGroup.controls['descriptionForm'] as FormGroup).controls['moods'].value as string);
      // form.append('genre', JSON.stringify(this.fileItemForm.));
      // (formGroup.controls['mixedIns'].value as Array<Sample>).map(sample => sample.sampleID).forEach((sampleId: string) => {
      //     this.console.log(sampleId);
      //     formData.append('mixedInID', sampleId);
      // });
    }

    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.buildFileItemForm();
      if (this.uploader.queue.length === 1) {
        this.audioService.loadBlob(fileItem._file);
      }
      // console.log(this.uploader.queue.length)
      // this.audioService.load(this.uploader.queue[0]._file);
      console.log(fileItem);
      // this.formsMap.set(fileItem, this.buildFileItemForm());
      this.formsSubject.next(this.formGroup);
      // const snackbarConfig: MatSnackBarConfig = new MatSnackBarConfig();
      // snackbarConfig.duration = 2000;
      // snackbarConfig.panelClass = 'snackbar';
      // this._snackbar.open(`Your want to upload ${this.formsMap.size} samples`, 'Cool.', snackbarConfig);
    };

    this.imageUploader.onAfterAddingFile = (fileItem: FileItem) => {
      (this.formGroup.controls['image'] as FormGroup).controls['file'].setValue(fileItem);
      console.log((this.formGroup.controls['image'] as FormGroup).controls['file'].value);
    };

    // tslint:disable-next-line:no-shadowed-variable
    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      console.log('OnWhenAddingFileFailed');
      console.log(item);
      console.log(filter);
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      let data = JSON.parse(response); //success server response
      alert(response);
      this.router.navigate(['licensing', 'start-distributing']);
    }

    this.uploader.onErrorItem = (item, res, status, headers) => {
      console.log('onErrorItem');
    };

    setTimeout(() => {
      this.audioService.createWavesurferObj(Theme.PRIMARY);
    });

    this.jwt.userData$.subscribe((userData: any) => {
      this.userData = userData;
    });

  }

  ngOnDestroy(): void {
    this.playStateControlService.emitPlayState(false);
}

playFileItem(isCurrentSample: boolean, sampleIndex: number, item: FileItem) {
  if (isCurrentSample) {
      // if(this.uploader.queue.length === 0) {

      // }
      // this.audioService.load(item._file);
      this.playStateControlService.emitPlayState(true);
      this.audioService.play();
  } else {
      this.playStateControlService.emitPlayState(true);
      this.currentSampleSubject$.next(sampleIndex);
      this.audioService.loadBlob(item._file);
      // this.playStateControlService.emitCurrentSampleID(sampleID);
  }
}

pauseFileItem(isCurrentSample: boolean, sampleIndex: number, item: FileItem) {
  if (isCurrentSample) {
      this.playStateControlService.emitPlayState(false);
      this.audioService.pause();
  } else {
      this.currentSampleSubject$.next(sampleIndex);
      // this.playStateControlService.emitCurrentSampleID(sample);
      // this.audioService.loadPlayAudio(sampleOwnerID, sampleName);
      this.audioService.loadBlob(item._file);
  }
}

  openMixedInsDialog() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(SelectMixedinsDialogComponent, {
      // width: '500px',
      data: { mixedIns: this.formGroup.controls['mixedIns'].value },
      // data: this.formsMap.get(item).controls['mixedIns'].value,
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe((data) => {

      console.log('The dialog was closed');
      // this.console.log(data);
      this.formGroup.controls['mixedIns'].setValue(data.mixedIns);
      // console.log(this.formsMap.get(item).controls['mixedIns'].value);
      this.formsSubject.next(this.formGroup);
    });
  }


  public buildFileItemForm(): FormGroup {

    this.formGroup = this.fb.group({
      'releaseArtistName': this.fb.control('', [Validators.required]),
      'releaseTitle': this.fb.control('', [Validators.required]),
      'mixedIns': this.fb.control([], [Validators.required]),
      'licenseeName': this.fb.control('', [Validators.required]),
      'image': this.fb.group({
        'file': [null, [
          Validators.required
        ]]
      }),
      // 'mixedIn': this.fb.group({
      //     'audioUnits': [null, [Validators.required]]
      // }),
    });

    // console.log((this.fileItemForm.controls['descriptionForm'] as FormGroup).controls['tempo']);

    return this.formGroup;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
}

onFileSelected(event) {
    console.log(event);
}



}
