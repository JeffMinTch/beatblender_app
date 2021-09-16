import { ArtistsHome } from './../../../shared/models/artists-home.model';
import { AudioWebService } from './../../../shared/services/web-services/audio-web.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

export interface ArtistTile{
  name: string,
  path: string
}

@Component({
  selector: 'app-choose-artist',
  templateUrl: './choose-artist.component.html',
  styleUrls: ['./choose-artist.component.scss']
})
export class ChooseArtistComponent implements OnInit {

  licenseType: string;

  count:number = 0;

  artistHome: ArtistsHome;
  
  page: number = 0;
  pageSize: number = 12;
  sortBy: string = 'title';

  artistList: ArtistTile[] = [
    {
      name: 'Forest River',
      path: '../../../../assets/images/sido.jpeg'
    },
    {
      name: 'Olyee',
      path: '../../../../assets/images/typ.jpg'
    },
    {
      name: 'Shic Shack',
      path: '../../../../assets/images/typ1.jpg'
    },
    {
      name: 'Artsy Paleo',
      path: '../../../../assets/images/typ2.jpg'
    },
    {
      name: 'Fire Shack',
      path: '../../../../assets/images/typ4.jpg'
    },
    {
      name: 'Westside Jump',
      path: '../../../../assets/images/typ5.jpg'
    },
    
  ];


  constructor(
    private activeRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private audioWebService: AudioWebService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      // if(params['id'] instanceof License)
      this.licenseType = params['id'];
      // alert(this.artistName);
      this.changeDetectorRef.detectChanges();
      this.audioWebService.getArtistsHome(
        new HttpParams()
        .set('licenseType', this.licenseType)
        .set('pageNo', '0')
        .set('pageSize', JSON.stringify(this.pageSize))
        .set('sortBy', this.sortBy)
      ).subscribe((artistHome: ArtistsHome) => {
        this.artistHome = artistHome;
      });
      

      // try {
      //   alert(this.licenseType);
      // } catch {
      //   alert('Error');
      // }
      // this.audioWebService.getSample(params['id']).subscribe((sample: Sample) => {
      //   this.sample = sample;
      //   this.audioService.initAudioPlayer(new Array<AudioUnit>(sample.audioUnit),Theme.ACCENT);
      // })
    });
  }

}
