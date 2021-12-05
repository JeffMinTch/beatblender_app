import { Component, OnInit } from '@angular/core';
import { StreamingService } from 'app/views/profile/distribute/distribute.component';

@Component({
  selector: 'app-distribute',
  templateUrl: './distribute.component.html',
  styleUrls: ['./distribute.component.scss']
})
export class DistributeComponent implements OnInit {

  streamingServiceList: StreamingService[] = [
    {
        name: 'spotify',
        path: 'spotify-new.svg'
    },
    {
        name: 'apple-music',
        path: 'apple-new.svg'
    },
    {
        name: 'amazon-music',
        path: 'amazon-music-new.svg'
    },
    {
        name: 'tidal',
        path: 'tidal-new.svg'
    },
    {
        name: 'pandora',
        path: 'pandora-new.svg'
    },
    {
        name: 'youtube',
        path: 'youtube-music-new.svg'
    },
    {
        name: 'napster',
        path: 'napster-new.svg'
    },
    {
        name: 'anghami',
        path: 'anghami-new.svg'
    },
    {
        name: 'deezer',
        path: 'deezer-new.svg'
    },
    {
        name: 'tik-tok',
        path: 'tiktok-new.svg'
    },
    {
        name: 'instagram',
        path: 'Download.jpeg'
    }
];

  constructor() { }

  ngOnInit(): void {
  }

}
