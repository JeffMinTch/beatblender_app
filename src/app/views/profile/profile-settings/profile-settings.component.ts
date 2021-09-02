import { UserWebService } from './../../../shared/services/web-services/user-web.service';
import { ArtistAlias } from './../../../shared/models/artist-alias.model';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { environment } from 'environments/environment';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit , AfterViewInit{
  // public uploader: FileUploader = new FileUploader({ url: 'upload_url' });

  @ViewChild('artistNameInput') public artistNameInput: ElementRef<HTMLInputElement>;

  public hasBaseDropZoneOver: boolean = false;

  private uploadOptions: FileUploaderOptions;
  private imageUploadOptions: FileUploaderOptions;
  private uploadUrl: string;
  public uploader: FileUploader;
  public imageUploader: FileUploader;
  public fileItemForm: FormGroup;
  public formsMap: Map<FileItem, FormGroup>;


  // public hasBaseDropZoneOver = true;


  constructor(
    private oauthService: OAuthService,
    private jwt: JwtAuthService,
    private fb: FormBuilder,
    private userWeb: UserWebService
    // private jwt: JwtAuthService


  ) {
    
    this.uploadUrl = `${environment.apiURL.baseUrl}${environment.apiURL.userPath.protected.root}${environment.apiURL.userPath.protected.setArtistImage}`;
    this.uploadOptions = {
      url: this.uploadUrl,
      authToken: 'Bearer ' + jwt.getJwtToken(),
      // allowedMimeType: ['audio/wav', 'audio/mp3', 'audio/mpeg'],
      allowedMimeType: ['image/jpeg', 'image/png', 'image/gif'],
      allowedFileType: ['image'],
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

    this.oauthService.events
      .pipe(filter((e: any) => {
        console.log(e);

        return e.type === 'token_refreshed';
      }))
      .subscribe(() => {
        console.log('Acces Token changed in FileUploadOptions');
        // setTimeout(() => {
        this.uploadOptions.authToken = 'Bearer ' + this.jwt.getJwtToken();
        this.uploader.setOptions(this.uploadOptions);
        // this.uploadOptions.headers = [{ name: 'x-ms-blob-type', value : 'BlockBlob' }];
        // },1000);
      });
      this.buildFileItemForm();

  }
  ngAfterViewInit(): void {
    this.jwt.userData$.subscribe((userData: any) => {
      console.log(this.artistNameInput);
      // (this.artistNameInput.nativeElement as HTMLInputElement).value = userData.artistAlias.artistName;
      this.fileItemForm.controls['artistName'].setValue(userData.artistAlias.artistName);
      console.log(userData);
    });
  }
  
  ngOnInit() {

    
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
      // console.log(this.uploadOptions);
      // console.log(fileItem); 
      // console.log(((this.fileItemForm.controls['image'] as FormGroup).controls['file'].value as FileItem)._file);
      // console.log('Yuhee');
      // tslint:disable-next-line:max-line-length
      // formData.append('artistName', this.fileItemForm.controls['artistName'].value);
      formData.append('artistImage', ((this.fileItemForm.controls['image'] as FormGroup).controls['file'].value as FileItem)._file); // note comma separating key and value
      
      // formData.append('someField2', 'testValue1');
      // const formGroup: FormGroup = this.formsMap.get(fileItem);
      // formData.append('sampleType', formGroup.controls['sampleType'].value);
      // formData.append('trackType', formGroup.controls['trackType'].value);
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
      // formData.append('tempo', (formGroup.controls['descriptionForm'] as FormGroup).controls['tempo'].value);
      // (formGroup.controls['mixedIns'].value as Array<Sample>).map(sample => sample.sampleID).forEach((sampleId: string) => {
      //     this.console.log(sampleId);
      //     formData.append('mixedInID', sampleId);
      // });
  };
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      if (this.uploader.queue.length === 1) {
        // this.audioService.loadBlob(fileItem._file);
      }
      if(this.uploader.queue.length > 1) {
        this.uploader.queue.shift();
        // return;
      }
      console.log(fileItem);
      (this.fileItemForm.controls['image'] as FormGroup).controls['file'].setValue(fileItem);
      // this.formsMap.set(fileItem, this.buildFileItemForm());
      // this.formsSubject.next(this.formsMap);
      // const snackbarConfig: MatSnackBarConfig = new MatSnackBarConfig();
      // snackbarConfig.duration = 2000;
      // snackbarConfig.panelClass = 'snackbar';
      // this._snackbar.open(`Your want to upload ${this.formsMap.size} samples`, 'Cool.', snackbarConfig);
    };

    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      console.log('OnWhenAddingFileFailed');
      console.log(item);
      console.log(filter);
    };

    this.uploader.onErrorItem = (item, res, status, headers) => {
      console.log('onErrorItem');
    };
    this.uploader.onSuccessItem = (item, res, status, headers) => {
      let data = JSON.parse(res); //success server response
      console.log(data);
      console.log(item);
      console.log(res);
      console.log(status);
      console.log(headers);
      // window.location.reload();
  
  }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  onFileSelected(event) {

  }

  public buildFileItemForm(): FormGroup {

    this.fileItemForm = this.fb.group({
        'artistName': this.fb.control('', [Validators.required]),
        'image': this.fb.group({
          'file': [null, [
              Validators.required
          ]]
      })
    });


    return this.fileItemForm;
}

public changeArtistName() {
  this.userWeb.changeArtistName(this.fileItemForm.controls['artistName'].value).subscribe((res) => {
    console.log(res);
    // window.location.reload();

  });
}
       

}
