import { Breadcrumb } from './../../../shared/models/breadcrumb.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { egretAnimations } from '../../..//shared/animations/egret-animations';
import { JwtAuthService } from '../../..//shared/services/auth/jwt-auth.service';
import { LocalStoreService } from '../../..//shared/services/local-store.service';
import { HttpService } from '../../..//shared/services/web-services/http.service';
// import { SampleLicensingMarketService } from '../../..//views/licensing/sample-licensing-market.service';
import { share } from 'rxjs/operators';
import { SampleLicensingMarketService } from '../../..//views/sample-market/sample-licensing-market.service';

@Component({
  selector: 'app-finances-overview',
  templateUrl: './finances-overview.component.html',
  styleUrls: ['./finances-overview.component.scss'],
  animations: [egretAnimations],

})
export class FinancesOverviewComponent implements OnInit {


  page: number = 1;
  pageSize: number = 12;
  sortBy: string = 'title';
  count: number = 0;
  vat: number = 16;
  subTotal: number = 0;
  total: number = 0;

  breadcrumbs: Array<Breadcrumb> = [
    {
      title: 'My Account',
      route: '/profile/overview'
    },
    {
      title: 'Finances',
      route: '/profile/finances'
    }
  ];

  activityData = [{
    month: 'January',
    spent: 240,
    opened: 8,
    closed: 30
  }, {
    month: 'February',
    spent: 140,
    opened: 6,
    closed: 20
  }, {
    month: 'March',
    spent: 220,
    opened: 10,
    closed: 20
  }, {
    month: 'April',
    spent: 440,
    opened: 40,
    closed: 60
  }, {
    month: 'May',
    spent: 340,
    opened: 40,
    closed: 60
  }];

  tasks = [{
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 0
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }, {
    text: 'Lorem, ipsum dolor sit amet',
    status: 1
  }
  ]

  tickets = [{
    img: 'assets/images/face-1.jpg',
    name: 'Mike Dake',
    text: 'Excerpt pipe is used.',
    date: new Date('07/12/2017'),
    isOpen: true
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Doe',
    text: 'My dashboard is not working.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-3.jpg',
    name: 'Jhonson lee',
    text: 'Fix stock issue',
    date: new Date('04/10/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-4.jpg',
    name: 'Mikie Jyni',
    text: 'Renew my subscription.',
    date: new Date('07/7/2017'),
    isOpen: false
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Jhone Dake',
    text: 'Payment confirmation.',
    date: new Date('04/10/2017'),
    isOpen: false
  }]


  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    private httpService: HttpService,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
  ) { }

  ngOnInit(): void {
    this.retrieveSamples();

  }

  

  public retrieveSamples(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.page, this.pageSize);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
    ).subscribe((response) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
      this.sampleLicensingMarketService.samples$.next(samples);

    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.ls.clear();
          this.jwt.signin();
        }
      }
      console.log(error);
    });
  }

  removeProduct(value: any) {

  }

}
