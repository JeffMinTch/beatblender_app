import { AudioUnit } from '../../../shared/models/audio-unit.model';
import { AudioWebService } from '../../../shared/services/web-services/audio-web.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Sample } from 'app/shared/models/sample.model';
import { RoutePartsService } from 'app/shared/services/route-parts.service';
import { filter } from 'rxjs/operators';
import { AudioService } from 'app/shared/services/audio.service';
import { Theme } from 'app/shared/enums/theme.enum';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from 'app/shared/components/dialogs/simple-dialog/simple-dialog.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { LicenseWebService } from 'app/shared/services/web-services/license-web.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-download-sample',
  templateUrl: './download-sample.component.html',
  styleUrls: ['./download-sample.component.scss']
})
export class DownloadSampleComponent implements OnInit {

  public sample: Sample = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private audioWebService: AudioWebService,
    private audioService: AudioService,
    public dialog: MatDialog,
    public router: Router,
    private loader: AppLoaderService,
    private licenseWebService: LicenseWebService
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
  
  }

  openDialog() {
    this.loader.open();
    this.licenseWebService.getBasicLicense(this.sample).subscribe(data => {
      this.loader.close();
      // console.log(data);
      // const dialogRef = this.dialog.open(SimpleDialogComponent, {
      //   width: '550px',
      //   // data: {name: this.name, animal: this.animal}
      //   data: {
      //     title: 'Congratulations!',
      //     firstParagraph: `Now you own a Basic License for ${sample.audioUnit.title} by ${sample.audioUnit.artistAlias.artistName}.`,
      //     submitButton: 'Manage Samples',
      //     // route: ''
      //     cancelButton: 'Keep digging'
      //   },
      //   // data: this.formsMap.get(item).controls['mixedIns'].value,
      //   hasBackdrop: false
      // });
      const dialogRef = this.dialog.open(SimpleDialogComponent, {
        width: '550px',
        // data: {name: this.name, animal: this.animal}
        data: {
          title: 'Congratulations!',
          firstParagraph: `You are now able to use ${this.sample.audioUnit.title} by ${this.sample.audioUnit.artistAlias.artistName} in your own production.`,
          secondParagraph: 'After you finished your track, release your new song through BeatBlender.',
          submitButton: 'My Sample Collection',
          // secondButton: ''
          // route: ''
          cancelButton: 'Keep digging'
        },
        // data: this.formsMap.get(item).controls['mixedIns'].value,
        hasBackdrop: false
      });

      dialogRef.afterClosed().subscribe(data => {
        console.log('The dialog was closed');
        this.router.navigate(data.route);
    
        // this.animal = result;
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.router.navigate(['profile', 'my-licenses', 'basic-licenses']);

      //   // this.animal = result;
      // });
    
    }, (httpErrorResponse: HttpErrorResponse) => {
      this.loader.close();
      console.log(httpErrorResponse);
      const dialogRef = this.dialog.open(SimpleDialogComponent, {
        width: '550px',
        // data: {name: this.name, animal: this.animal}
        data: {
          title: 'Already Done!',
          firstParagraph: `HeyHo! You already agreed to our License Conditions for this Sample.<br><strong>'${this.sample.audioUnit.title}'</strong> by <strong>${this.sample.audioUnit.artistAlias.artistName}</strong> is already in your Sample Collection.`,
          // secondParagraph: 'After you finished your track, release your new song through BeatBlender.',
          submitButton: 'My Sample Collection',
          // secondButton: ''
          // route: ''
          cancelButton: 'Keep digging'
        },
        // data: this.formsMap.get(item).controls['mixedIns'].value,
        hasBackdrop: false
      });

      dialogRef.afterClosed().subscribe(data => {
        console.log('The dialog was closed');
        this.router.navigate(data.route);
    
        // this.animal = result;
      });
      // if (httpErrorResponse.error.status === 400) {

      // }
    })};
    // const dialogRef = this.dialog.open(SimpleDialogComponent, {
    //   width: '550px',
    //   // data: {name: this.name, animal: this.animal}
    //   data: {
    //     title: 'Congratulations!',
    //     firstParagraph: `You are now able to use ${this.sample.audioUnit.title} by ${this.sample.audioUnit.artistAlias.artistName} in your own production.`,
    //     secondParagraph: 'After you finished your track, release your new song through BeatBlender.',
    //     submitButton: 'My Sample Collection',
    //     // secondButton: ''
    //     // route: ''
    //     cancelButton: 'Keep digging'
    //   },
    //   // data: this.formsMap.get(item).controls['mixedIns'].value,
    //   hasBackdrop: false
    // });
  
    // dialogRef.afterClosed().subscribe(data => {
    //   console.log('The dialog was closed');
    //   this.router.navigate(data.route);
  
    //   // this.animal = result;
    // });

  // }
  // }

}
