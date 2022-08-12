import { JwtAuthService } from '../../..//shared/services/auth/jwt-auth.service';
import { AudioWebService } from '../../..//shared/services/web-services/audio-web.service';
import { Component, OnInit } from '@angular/core';
import { Release } from '../../../shared/models/release.model';
import { AudioService } from '../../..//shared/services/audio.service';
import { Theme } from '../../..//shared/enums/theme.enum';
import { egretAnimations } from '../../..//shared/animations/egret-animations';
import { environment } from '../../../../environments/environment';
import { Track } from '../../..//shared/models/track.model';
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
    private jwt: JwtAuthService
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

  downloadTrackLicense(track: Track) {
    const API = `${environment.apiURL.baseUrl + environment.apiURL.mediaPath.protected.root + environment.apiURL.mediaPath.protected.getBasicLicenseFile}/${track.trackID}/${track.audioUnit.artistAlias.artist.user.uuid}`;
    window.location.href = API;
  }

}
