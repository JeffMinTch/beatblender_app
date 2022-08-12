import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  public getRequestParams(sortBy: string, page: number, pageSize: number) {
    return new HttpParams()
      .set('sortBy', sortBy)
      .set('pageNo', JSON.stringify(page))
      .set('pageSize', JSON.stringify(pageSize));
  }

  // public createEditAudioUnitDataRequestParams(audioUnitDatType: AudioUnitDataType) {
  //   return new HttpParams()
  //     .set(audioUnitDatType, )
  // }
  //   {};
  //   if (sortBy) {
  //     params['sortBy'] = sortBy;
  //   }
    
  //   if (page) {
  //     params['page'] = page - 1;
  //   }
    
  //   if (pageSize) {
  //     params['pageSize'] = pageSize;
  //   }
  //   return params;
}
