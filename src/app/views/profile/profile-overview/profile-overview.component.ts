import { MatTableDataSource } from '@angular/material/table';
import { ThemeService } from './../../../shared/services/theme.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { egretAnimations } from '../../..//shared/animations/egret-animations';
import { Theme } from '../../..//shared/enums/theme.enum';
import { SamplePage } from '../../..//shared/models/sample-page.model';
import { Sample } from '../../..//shared/models/sample.model';
import { AppLoaderService } from '../../..//shared/services/app-loader/app-loader.service';
import { AudioService } from '../../..//shared/services/audio.service';
import { JwtAuthService } from '../../..//shared/services/auth/jwt-auth.service';
import { LayoutService } from '../../..//shared/services/layout.service';
import { LocalStoreService } from '../../..//shared/services/local-store.service';
import { MatchMediaService } from '../../..//shared/services/match-media.service';
import { PlayStateControlService } from '../../..//shared/services/play-state-control.service';
import { AudioWebService } from '../../..//shared/services/web-services/audio-web.service';
import { HttpService } from '../../..//shared/services/web-services/http.service';
import { LicenseWebService } from '../../..//shared/services/web-services/license-web.service';
import { SampleLicensingMarketService } from '../../..//views/sample-market/sample-licensing-market.service';
import { map, share, takeUntil } from 'rxjs/operators';
import tinyColor from 'tinycolor2';


@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
  animations: egretAnimations

})
export class ProfileOverviewComponent implements OnInit {

  pageNo: number = 0;
  pageSize: number = 30;
  sortBy: string = 'title';
  count: number = 0;

  cryptoChart: any;
  dailyTrafficChartBar: any;
  trafficGrowthChart: any;
  trafficSourcesChart: any;
  countryTrafficStats: MatTableDataSource<any> = new MatTableDataSource<any>();


  samplingCountriesPieOptions = {
    backgroundColor: '#ffffff',
    color: ['#3CB2EF','#71F6F9', '#658566', '#FFAE8B', '#E062AE','#2C3162',  '#6F7394', '#FFFFFF','#F44336'],
    // title: {
    //     text: 'Customized Pie',
    //     left: 'center',
    //     top: 20,
    //     textStyle: {
    //         color: '#ccc'
    //     }
    // },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'Production',
            type:'pie',
            radius : '65%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'JAPAN'},
                {value:310, name:'RUSSIA'},
                {value:274, name:'GERMANY'},
                {value:235, name:'INDIA'},
                {value:400, name:'USA'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0 , 0, 0, 0.87)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(0 , 0, 0, 0.87)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#d69090',
                    // shadowBlur: 200,
                    // shadowColor: 'rgba(15, 21, 77, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};

  customPieOptions = {
    backgroundColor: '#ffffff',
    color: ['#3CB2EF','#71F6F9', '#658566', '#FFAE8B', '#E062AE','#2C3162',  '#6F7394', '#FFFFFF','#F44336'],
    // title: {
    //     text: 'Customized Pie',
    //     left: 'center',
    //     top: 20,
    //     textStyle: {
    //         color: '#ccc'
    //     }
    // },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'Production',
            type:'pie',
            radius : '65%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'Techno'},
                {value:310, name:'Dance'},
                {value:274, name:'R&B'},
                {value:235, name:'Latin'},
                {value:400, name:'HipHop'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0 , 0, 0, 0.87)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(0 , 0, 0, 0.87)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#658566',
                    // shadowBlur: 200,
                    // shadowColor: 'rgba(15, 21, 77, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};


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

  public geoChartData = {
    chartType:'GeoChart',
    dataTable:[
      ['Country', 'Popularity'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['RU', 700],
      ['India', 100]
    ],
    options:{
      // 'region': 'IT',
      // 'displayMode':'markers',
      'colorAxis': {colors: ['#d69090', '#658566']}
    }
  };

  userData: any;


  

  constructor(
    public sampleLicensingMarketService: SampleLicensingMarketService,
    public playStateControlService: PlayStateControlService,
    private audioService: AudioService,
    private loader: AppLoaderService,
    private changeDetectorRef: ChangeDetectorRef,
    private jwt: JwtAuthService,
    private ls: LocalStoreService,
    private audioWebService: AudioWebService,
    private licenseWebService: LicenseWebService,
    private fb: FormBuilder,
    private layout: LayoutService,
    private matchMedia: MatchMediaService,
    public dialog: MatDialog,
    private router: Router,
    private httpService: HttpService,
    private activeRoute: ActivatedRoute,
    private themeService: ThemeService
  ) { 

    this.sampleLicensingMarketService.samples$.pipe(
      map((samples: Array<Sample>) => {
        this.loader.close();
        this.audioService.initAudioPlayer(samples.map(sample => sample.audioUnit), Theme.ACCENT);
        return samples;
      }),
      takeUntil(this.sampleLicensingMarketService.sampleLicensingMarketDestroyed$),
    ).subscribe((samples: Array<Sample>) => {
      console.log(samples);
      // if (samples.length > 0) {
      //   this.initCurrentFile(samples[0].audioUnit.audioUnitID);
      // }
    });

    this.retrieveSamples();

  }

  ngOnInit() {
    this.jwt.userData$.subscribe((userData) => {
      this.userData = userData;
    });



    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initCryptoChart(activeTheme);
    this.initDailyTrafficChartBar(activeTheme)
    this.initTrafficGrowthChart(activeTheme)
    this.initTrafficSourcesChart(activeTheme)


      
    });
    this.initCryptoChart(this.themeService.activatedTheme);
    this.initDailyTrafficChartBar(this.themeService.activatedTheme);
    this.initTrafficGrowthChart(this.themeService.activatedTheme);
    this.initTrafficSourcesChart(this.themeService.activatedTheme);
    this.countryTrafficStats.data = [ {
      
      artist: {
        artistName: "Archer",
        image: "../../../../assets/images/typ4.jpg"
      },
      country: "US",
      visitor: 14040,
      pageView: 10000,
      download: 1000,
      bounceRate: 30,
      flag: "flag-icon-us"
    },
    {
      artist: {
        artistName: "Bladeo",
        image: "../../../../assets/images/frau.jpg"
      },
      country: "India",
      visitor: 12500,
      pageView: 10000,
      download: 1000,
      bounceRate: 45,
      flag: "flag-icon-in"
    },
    {
      artist: {
        artistName: "Muto Ono",
        image: "../../../../assets/images/typ5.jpg"
      },
      country: "UK",
      visitor: 11000,
      pageView: 10000,
      download: 1000,
      bounceRate: 50,
      flag: "flag-icon-gb"
    },
    {
      artist: {
        artistName: "Inu-A",
        image: "../../../../assets/images/typ6.jpg"
      },
      country: "Brazil",
      visitor: 4000,
      pageView: 10000,
      download: 1000,
      bounceRate: 30,
      flag: "flag-icon-br"
    },
    {
      artist: {
        artistName: "Crazy Shack",
        image: "../../../../assets/images/typ7.jpg"
      },
      country: "Spain",
      visitor: 4000,
      pageView: 10000,
      download: 1000,
      bounceRate: 45,
      flag: "flag-icon-es"
    },
    {
      artist: {
        artistName: "Disco Tesco",
        image: "../../../../assets/images/typ8.jpg"
      },
      country: "Mexico",
      visitor: 4000,
      pageView: 10000,
      download: 1000,
      bounceRate: 70,
      flag: "flag-icon-mx"
    },
    {
      artist: {
        artistName: "Vlad Disco",
        image: "../../../../assets/images/typ4.jpg"
      },
      country: "Russia",
      visitor: 4000,
      pageView: 10000,
      download: 1000,
      bounceRate: 40,
      flag: "flag-icon-ru"
    }
    // this.countryTrafficStats = [
    //   {
    //     artistName: "Ulli",
    //     country: "US",
    //     visitor: 14040,
    //     pageView: 10000,
    //     download: 1000,
    //     bounceRate: 30,
    //     flag: "flag-icon-us"
    //   },
    //   // {
    //   //   artist: {
    //   //     artistName: "Muto Ono",
    //   //     image: ""
    //   //   },
    //   //   country: "India",
    //   //   visitor: 12500,
    //   //   pageView: 10000,
    //   //   download: 1000,
    //   //   bounceRate: 45,
    //   //   flag: "flag-icon-in"
    //   // },
    //   // {
    //   //   artist: {
    //   //     artistName: "Muto Ono",
    //   //     image: ""
    //   //   },
    //   //   country: "UK",
    //   //   visitor: 11000,
    //   //   pageView: 10000,
    //   //   download: 1000,
    //   //   bounceRate: 50,
    //   //   flag: "flag-icon-gb"
    //   // },
    //   // {
    //   //   artist: {
    //   //     artistName: "Muto Ono",
    //   //     image: ""
    //   //   },
    //   //   country: "Brazil",
    //   //   visitor: 4000,
    //   //   pageView: 10000,
    //   //   download: 1000,
    //   //   bounceRate: 30,
    //   //   flag: "flag-icon-br"
    //   // },
    //   // {
    //   //   artist: {
    //   //     artistName: "Muto Ono",
    //   //     image: ""
    //   //   },
    //   //   country: "Spain",
    //   //   visitor: 4000,
    //   //   pageView: 10000,
    //   //   download: 1000,
    //   //   bounceRate: 45,
    //   //   flag: "flag-icon-es"
    //   // },
    //   // {
    //   //   artist: {
    //   //     artistName: "Muto Ono",
    //   //     image: ""
    //   //   },
    //   //   country: "Mexico",
    //   //   visitor: 4000,
    //   //   pageView: 10000,
    //   //   download: 1000,
    //   //   bounceRate: 70,
    //   //   flag: "flag-icon-mx"
    //   // },
    //   // {
    //   //   artist: {
    //   //     artistName: "Muto Ono",
    //   //     image: ""
    //   //   },
    //   //   country: "Russia",
    //   //   visitor: 4000,
    //   //   pageView: 10000,
    //   //   download: 1000,
    //   //   bounceRate: 40,
    //   //   flag: "flag-icon-ru"
    //   // }
    // ];
  ];


    

  }
  
  ngAfterViewInit() {
    
    
  }

  public retrieveSamples(): void {
    const params = this.httpService.getRequestParams(this.sortBy, this.pageNo, this.pageSize);
    this.audioService.emitAudioUnitsLoading(true);
    this.sampleLicensingMarketService.initSamples(params).pipe(
      share(),
      map((res: SamplePage) => { return res })
    ).subscribe((response: SamplePage) => {
      console.log("Response");
      console.log(response);
      const { samples, totalItems } = response;
      this.count = totalItems;
      this.audioService.emitAudioUnitsLoading(false);
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

  // handlePageChange(pageNo: number) {
  //   console.log(pageNo);
  //   this.pageNo = pageNo;
  //   this.applyFilter(this.pageNo - 1, this.searchFilterFormMap);
  //   // this.retrieveSamples();
  // }

  // changePage(pageNo: number) {
  //   this.pageNo = pageNo;
  //   this.initSearchFilterFormMap(this.selectionList, this.minMaxList);

  // }

  changeCount(count: number) {
    this.count = count;
  }

  initDailyTrafficChartBar(theme) {
    this.dailyTrafficChartBar = {
      legend: {
        show: false
      },
      grid: {
        left: "8px",
        right: "8px",
        bottom: "0",
        top: "0",
        containLabel: true
      },
      tooltip: {
        show: true,
        backgroundColor: "rgba(0, 0, 0, .8)"
      },
      xAxis: [
        {
          type: "category",
          // data: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          data: ["1", "2", "3", "4", "5", "6", "7"],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false,
            formatter: "${value}"
          },
          min: 0,
          max: 100000,
          interval: 25000,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            interval: "auto"
          }
        }
      ],

      series: [
        {
          name: "Streams",
          data: [35000, 69000, 22500, 60000, 50000, 50000, 30000],
          label: { show: true, color: tinyColor('#658566').toString(), position: "top" },
          type: "bar",
          barWidth: "12",
          color: tinyColor('#658566').toString(),
          smooth: true,
          itemStyle: {
            barBorderRadius: 0
          }
        }
      ]
    };
  }

  initCryptoChart(theme) {
    this.cryptoChart = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "60",
        right: "20",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ],
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          data: [
            640,
            1040,
            840,
            1240,
            1040,
            1440,
            1240,
            1640,
            1440,
            1840,
            1640,
            2040,
            1840,
            2240,
            2040,
            1000,
            2240,
            2640,
            2440,
            2840,
            2640,
            3040,
            2840,
            3240,
            3040,
            3440,
            3240,
            3640,
            3440,
            3840
          ],
          type: "line",
          name: "You",
          smooth: true,
          color: tinyColor('#658566').toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: tinyColor('#658566').toString(),
              borderColor: tinyColor('#10174c').setAlpha(.4).toString(),
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        },
        {
          data: [
            240,
            640,
            440,
            840,
            640,
            1040,
            840,
            1240,
            1040,
            1440,
            1240,
            1640,
            1440,
            1840,
            1640,
            2040,
            1840,
            2240,
            2040,
            2440,
            2240,
            2640,
            2440,
            2840,
            2640,
            3040,
            2840,
            3240,
            3040,
            3440
          ],
          type: "line",
          name: "Average Dark Disco Streams",
          smooth: true,
          color: "#d69090",
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: "#d69090",
              borderColor: "rgba(0, 0, 0, .2)",
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        }
      ]
    };
  }

  initTrafficSourcesChart(theme) {
    this.trafficSourcesChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: [
        tinyColor('#658566').setAlpha(.6).toString(),
        tinyColor('#d69090').setAlpha(.7).toString(),
        tinyColor('#ececec').setAlpha(.8).toString()
      ],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["55%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(15, 21, 77, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 335,
              name: "Spotify"
            },
            {
              value: 310,
              name: "Apple Music"
            },
            { value: 148, name: "Tidal" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  initTrafficGrowthChart(theme) {
    this.trafficGrowthChart = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["0", "1", "2", "3", "4"],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Visit",
          type: "line",
          smooth: false,
          data: [0, 40, 140, 90, 160],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: tinyColor('#658566').toString()
                  },
                  {
                    offset: 1,
                    color: tinyColor('#658566').setAlpha(.6).toString()
                  }
                ]
              }
            }
          }
        }
      ]
    };
  }

}
