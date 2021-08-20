import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  artistList: ArtistTile[] = [
    {
      name: 'Sido',
      path: '../../../../assets/images/sido.jpeg'
    },
    {
      name: 'Drake',
      path: '../../../../assets/images/typ.jpg'
    },
    {
      name: 'ABBA',
      path: '../../../../assets/images/typ1.jpg'
    },
    {
      name: 'Kanye West',
      path: '../../../../assets/images/typ2.jpg'
    },
    {
      name: 'Quavo',
      path: '../../../../assets/images/typ4.jpg'
    },
    {
      name: 'The WeekEnd',
      path: '../../../../assets/images/typ5.jpg'
    },
    
  ];


  constructor(
    private activeRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      // if(params['id'] instanceof License)
      this.licenseType = params['id'];
      // alert(this.artistName);
      this.changeDetectorRef.detectChanges();
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
