import { AudioService } from './../../../../shared/services/audio.service';
import { MediaWebService } from './../../../../shared/services/web-services/media-web.service';
import { LicenseWebService } from './../../../../shared/services/web-services/license-web.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'environments/environment';
import {saveAs as importedSaveAs} from "file-saver";
import { Subject } from 'rxjs';
import { Sample } from 'app/shared/models/sample.model';
import { BasicLicense } from 'app/shared/models/basic-license.model';
import { sample } from 'rxjs/operators';
import { Theme } from 'app/shared/enums/theme.enum';
import { egretAnimations } from 'app/shared/animations/egret-animations';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  c: string;
}


// export interface BasicLicense {
//   image: string;
//   id: string,
//   title: string;
//   copyrightOwner: string,
//   extensionPrice: number;
//   downloadSampleLink: string;
//   downloadContractLink: string
// }

// const ELEMENT_DATA: BasicLicense[] = [
//   {image: 'typ.jpg', id: '010-312-313', title: 'I Got U', copyrightOwner: 'Jar Jar', extensionPrice: 12, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'frau.jpg',id: '345-456-243', title: 'Ocean Drive', copyrightOwner: 'Duke Dumont', extensionPrice: 2, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ2.jpg',id: '983-643-453', title: 'Pippi Langstrumpf', copyrightOwner: 'Astrid Lindgren', extensionPrice: 1, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ4.jpg',id: '938-648-099', title: 'Ollala Muko', copyrightOwner: 'Unana Mana', extensionPrice: 8, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ5.jpg',id: '664-595.302', title: 'Balla Balla', copyrightOwner: 'Pico', extensionPrice: 4, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ6.jpg',id: '233-233-233', title: 'Natural Forest Sounds', copyrightOwner: 'The Pianist', extensionPrice: 5, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ7.jpg',id: '340-444-657', title: 'Infinity Synth', copyrightOwner: 'Hackermann Sounds', extensionPrice: 233, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ8.jpg',id: '202-323-124', title: 'Barischnikov No. 9', copyrightOwner: 'Donny Brasco', extensionPrice: 1200, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ9.jpg',id: '367-022-119', title: 'Miyagi Do Sounds', copyrightOwner: 'Karate Kid', extensionPrice: 200, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
//   {image: 'typ10.jpg',id: '868-090-245', title: 'Aiaiai', copyrightOwner: 'Indigin Sounds', extensionPrice: 3, downloadSampleLink: 'H', downloadContractLink: 'csacsac'},
// ];






@Component({
  selector: 'app-basic-licenses',
  templateUrl: './basic-licenses.component.html',
  styleUrls: ['./basic-licenses.component.scss'],
  animations: [egretAnimations],

})
export class BasicLicensesComponent implements OnInit {

  public samples: Array<Sample> = null;
  public viewMode = 'grid-view';


    // dataSource: MatTableDataSource<PeriodicElement>;
  // displayedColumns: string[];
  dataSource; 
  displayedColumns   = ['image','id', 'title', 'copyrightOwner', 'extensionPrice', 'downloadSampleLink', 'downloadContractLink'];
  basicLicenseSubject$: Subject<Array<BasicLicense>> = new Subject<Array<BasicLicense>>();
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private mediaWebService: MediaWebService,
    private licenseWebService: LicenseWebService,
    private audioService: AudioService
    ) {
  }
  
  ngOnInit() {
    this.licenseWebService.getAllBasicLicense().subscribe((data:Array<BasicLicense>) => {
      console.log(data);
      this.samples = data.map((basicLicense: BasicLicense) => basicLicense.sample);
      this.audioService.initAudioPlayer(this.samples.map(sample => sample.audioUnit), Theme.BODY);
      this.basicLicenseSubject$.next(data);
      this.dataSource = new MatTableDataSource<BasicLicense>(data);
    })
    // this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'c'];
  }
  
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  downloadAudioFile(sample: Sample) {
    // console.log(element);
    const API: string = `${environment.apiURL.baseUrl + environment.apiURL.mediaPath.public.root + environment.apiURL.mediaPath.public.audio}/${sample.audioUnit.audioUnitID}`;
    // window.location.href = API;

    this.mediaWebService.downloadFile(API).subscribe(blob => {
      // console.log(blob);
  //     const url= window.URL.createObjectURL(blob);
  // window.location.href= API;
  // window.saveAs(blob, element.sample.audioUnit.audioFileName)
      importedSaveAs(blob, sample.audioUnit.audioFileName);
  }
)
  }
  

  downloadBasicLicenseFile(element) {
    const API = `${environment.apiURL.baseUrl + environment.apiURL.mediaPath.protected.root + environment.apiURL.mediaPath.protected.getBasicLicenseFile}/${element.sample.sampleID}/${element.downloader.uuid}`;
    window.location.href = API;
  }


}
