import { AudioUnitType } from './../../enums/audio-unit-type.enums';
import { TrackPage } from './../../models/track-page.model';
import { ArtistsHome } from './../../models/artists-home.model';

import { PaginationRequestParams } from '../../models/pagination-request-params.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFilterFormMap } from 'app/shared/models/search-filter-form-map.model';
import { environment } from 'environments/environment'
import { Observable, Subject } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { SamplePage } from 'app/shared/models/sample-page.model';
import { MyUploads } from 'app/shared/models/my-uploads.model';
import { AudioUnit } from 'app/shared/models/audio-unit.model';
import { Sample } from 'app/shared/models/sample.model';
import { Track } from 'app/shared/models/track.model';
import { Release } from 'app/shared/models/release.model';





@Injectable({
  providedIn: 'root'
})
export class AudioWebService {



  public searchFilterSubject$: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }



  private ROOT = environment.apiURL.baseUrl;
  private PUBLIC_AUDIO = this.ROOT + environment.apiURL.audioPath.public.root;
  private PROTECTED_AUDIO = this.ROOT + environment.apiURL.audioPath.protected.root;

  private samplesHomeApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.samplesHome;
  private TRACKS_HOME: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.tracksHome;
  private findByStringApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.findByString;
  private applySampleSearchFilterApi: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.filterSamples;
  private FILTER_TRACKS: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.filterTracks;
  private GET_UPLOADS: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.getUploads;
  private UPDATE_TITLE: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.updateTitle;
  private UPDATE_GENRE: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.updateGenre;
  private UPDATE_TEMPO: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.updateTempo;
  private UPDATE_MOODS: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.updateMoods;
  private UPDATE_TAGS: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.updateTags;
  private GET_SAMPLE: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.getSample;
  private ARTISTS_HOME: string = this.PUBLIC_AUDIO + environment.apiURL.audioPath.public.artistHome;
  private GET_SAMPLES_FROM_ARTIST: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.getSampleFromArtist;
  private GET_RELEASES: string = this.PROTECTED_AUDIO + environment.apiURL.audioPath.protected.getReleases;


  public getSamplePage(params: any): Observable<SamplePage> {
    return this.httpClient.get(this.samplesHomeApi, { params }).pipe(map((res: SamplePage) => { return res }), share());
  }



  public getTracksHome(params: any): Observable<TrackPage> {
    return this.httpClient.get(this.TRACKS_HOME, { params }).pipe(map((res: TrackPage) => { return res }), share());
  }



  public findBySearchString(audioUnitType: AudioUnitType, params: HttpParams): Observable<SamplePage | TrackPage> {
    let api: string;
    switch(audioUnitType) {
      case AudioUnitType.Sample:
        api = this.findByStringApi;
        break;
      case AudioUnitType.Track:
        api = this.FILTER_TRACKS;
        break;
      default:
        throw new Error('Wrong AudioUnitType');
      }
      return this.httpClient.get(api, { params: params }).pipe( map((page: SamplePage | TrackPage) => page));
  }

  public applySearchFilter(searchString: string, searchFilterFormMap: SearchFilterFormMap, audioUnitType: AudioUnitType, paginationRequestParams: PaginationRequestParams): void {
    const formData: FormData = new FormData();
    if(searchString) {
      formData.append('searchString', searchString);
    } else {
      formData.append('searchString', '');
    }
    formData.append('sortBy', paginationRequestParams.sortBy);
    formData.append('pageNo', JSON.stringify(paginationRequestParams.pageNo));
    formData.append('pageSize', JSON.stringify(paginationRequestParams.pageSize));
    console.log(paginationRequestParams.pageNo);
    console.log(paginationRequestParams.sortBy);
    console.log(paginationRequestParams.pageSize);

    searchFilterFormMap.selectionFormMap.forEach((selection, control) => {
      (control.value as Array<any>).forEach((value) => {
        if (value !== 0) {
          formData.append(selection.label, value);
        }
      });
    });
    searchFilterFormMap.minMaxSliderFormMap.forEach((minMaxSlider, formGroup) => {
      formData.append(`min${minMaxSlider.label}`, JSON.stringify(formGroup.controls['minControl'].value));
      formData.append(`max${minMaxSlider.label}`, JSON.stringify(formGroup.controls['maxControl'].value));
    });
    // if(audioUnitType === AudioUnitType.Sample) {
    //   api = this.applySampleSearchFilterApi;
    // } else if()
    let api: string;
    switch (audioUnitType) {
      case AudioUnitType.Sample:
        api = this.applySampleSearchFilterApi;
        break;
      case AudioUnitType.Track:
        api = this.TRACKS_HOME;
        break;
      default:
        throw new Error('Wrong Audio Unit Type');
    }

    this.httpClient.post(api, formData).subscribe((data) => {
      this.searchFilterSubject$.next(data);
    },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          const response = {
            samples: [],
            totalItems: 0
          }
          this.searchFilterSubject$.next(response);
          // this.count = 0;
        }
      }
    );
  }

  getSample(audioUnitID: string): Observable<Sample> {
    return this.httpClient.get(`${this.GET_SAMPLE}/${audioUnitID}`).pipe(map((sample: Sample) => sample));
  }

  public getReleases(): Observable<Array<Release>> {
    return this.httpClient.get(this.GET_RELEASES).pipe(map((res: Array<Release>) => { return res }));
  }


  filterTracks(params: HttpParams): Observable<TrackPage> {
    return this.httpClient.get(this.FILTER_TRACKS, { params: params}).pipe(map((trackPage: TrackPage) => trackPage));
  }

  getArtistsHome(params: HttpParams): Observable<ArtistsHome> {
    return this.httpClient.get(this.ARTISTS_HOME, { params: params}).pipe(map((artistsHome: ArtistsHome) => artistsHome));
  }

  getUploads(): Observable<MyUploads> {
    return this.httpClient.get(this.GET_UPLOADS).pipe(map((myUploads: MyUploads) => myUploads));
  }

  getSamplesFromArtist(artistALiasID: string, params: HttpParams): Observable<SamplePage> {
    return this.httpClient.get(`${this.GET_SAMPLES_FROM_ARTIST}/${artistALiasID}`).pipe(map((samples: SamplePage) => samples));
  }

  updateTitle(title: string, audioUnit: AudioUnit): Observable<Sample | Track> {
    const formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('audioUnitID', audioUnit.audioUnitID);
    console.log(title);
    return this.httpClient.patch(this.UPDATE_TITLE, formData).pipe(map((audioUnit: Sample | Track) => audioUnit));
  }

  updateTempo(tempo: number, audioUnit: AudioUnit): Observable<Sample | Track> {
    const formData: FormData = new FormData();
    formData.append('tempo', JSON.stringify(tempo));
    formData.append('audioUnitID', audioUnit.audioUnitID);
    return this.httpClient.patch(this.UPDATE_TEMPO, formData).pipe(map((audioUnit: Sample | Track) => audioUnit));
  }

  updateGenre(genre: string, audioUnit: AudioUnit): Observable<Sample | Track> {
    const formData: FormData = new FormData();
    formData.append('genre', genre);
    formData.append('audioUnitID', audioUnit.audioUnitID);
    return this.httpClient.patch(this.UPDATE_GENRE, formData).pipe(map((audioUnit: Sample | Track) => audioUnit));
  }


  // updateTitle(title: string): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('title', title);
  //   return this.httpClient.put(this.UPDATE_TITLE, formData);
  // }
  // updateTitle(title: string): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('title', title);
  //   return this.httpClient.put(this.UPDATE_TITLE, formData);
  // }

  

  // searchAudioByFormInput(searchString: string): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('searchString', searchString);
  //   return this.httpClient.post(this.findMultipleSuggestionsApi, formData);
  // }

  // searchSingleAudio(sampleId: number): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('sampleId', JSON.stringify(sampleId));
  //   return this.httpClient.post(this.findOneApi, formData);
  // }

  // searchMultipleAudio(sampleIds: Array<number>): Observable<any> {
  //   const formData: FormData = new FormData();
  //   for (let i = 0; i < sampleIds.length; i++) {
  //     formData.append("sampleIds", JSON.stringify(sampleIds[i]));
  //   }
  //   return this.httpClient.post(this.findMultipleApi, formData);
  // }


}
