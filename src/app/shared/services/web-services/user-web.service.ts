import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserWebService {

  private ROOT = environment.apiURL.baseUrl;
  private PROTECTED_USER = this.ROOT + environment.apiURL.userPath.protected.root;
  private GET_USER_DATA: string = this.PROTECTED_USER + environment.apiURL.userPath.protected.userData;
  private CHANGE_ARTIST_NAME: string = this.PROTECTED_USER + environment.apiURL.userPath.protected.setArtistName;
  
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUserData(): Observable<any> {
    return this.httpClient.get(this.GET_USER_DATA);
  }

  changeArtistName(artistName: string):Observable<any> {
    const formData: FormData = new FormData();
    formData.append("artistName", artistName);
    return this.httpClient.post(this.CHANGE_ARTIST_NAME, formData);
  }

  



}
