import { AudioWebService } from 'app/shared/services/web-services/audio-web.service';
import { Component, OnInit } from '@angular/core';
import { Release } from '../../../shared/models/release.model';
import { AudioService } from 'app/shared/services/audio.service';
import { Theme } from 'app/shared/enums/theme.enum';
import { egretAnimations } from 'app/shared/animations/egret-animations';
@Component({
  selector: 'app-my-releases',
  templateUrl: './my-releases.component.html',
  styleUrls: ['./my-releases.component.scss'],
  animations: [egretAnimations],
})
export class MyReleasesComponent implements OnInit {

  public viewMode: 'grid-view' | 'list-view' = 'grid-view';
  public releases: Array<Release> = null;



  constructor(
    private audioWebService: AudioWebService,
    private audioService: AudioService,

  ) { }

  ngOnInit(): void {
    this.audioWebService.getReleases().subscribe((releases:Array<Release>) => {
      console.log(releases);
      this.releases = releases;
      this.audioService.initAudioPlayer(this.releases.map(release => release.track.audioUnit), Theme.BODY);
      // this.basicLicenseSubject$.next(data);
      // this.dataSource = new MatTableDataSource<BasicLicense>(data);
    });
  } 

  changeViewMode(viewMode: 'grid-view' | 'list-view') {
    this.viewMode = viewMode;
  }

}
