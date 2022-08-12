import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { Router } from '@angular/router'
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
// import PerfectScrollbar from 'perfect-scrollbar';
import { ILayoutConf, LayoutService } from '../../shared/services/layout.service';
import Typewriter from 'typewriter-effect/dist/core';
import { NavigationService } from '../../shared/services/navigation.service';
import { Subscription } from 'rxjs';
import { StreamingService } from '../profile/distribute/distribute.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren('soundBar') public soundbars: QueryList<ElementRef>;

  public mainVersion;

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

  /****** Only for demo) **********/
  public versions: any[] = [
    {
      name: 'Dark sidebar',
      photo: 'assets/images/screenshots/black_sidebar.png',
      dest: 'dashboard/analytics',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "sidebarColor": "slate",
        "topbarColor": "white",
        "footerColor": "slate",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy"
      }`
    }, {
      name: 'Light Sidebar',
      photo: 'assets/images/screenshots/white_sidebar.png',
      dest: 'dashboard/default',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "sidebarColor": "white",
        "topbarColor": "white",
        "footerColor":"slate",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-blue"
      }`
    },
    {
      name: 'Dark Theme',
      photo: 'assets/images/screenshots/dark_theme.png',
      dest: 'dashboard/crypto',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "ltr",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-dark-purple"
      }`
    },
    // {
    //   name: 'RTL (Top Nav)',
    //   photo: 'assets/images/screenshots/top-simple-rtl.png',
    //   dest: 'profile/settings',
    //   conf: `{
    //     "navigationPos": "top",
    //     "sidebarStyle": "full",
    //     "dir": "rtl",
    //     "useBreadcrumb": true,
    //     "topbarFixed": false,
    //     "breadcrumb": "simple"
    //   }`
    // },
    // {
    //   name: 'Dark Purple',
    //   photo: 'assets/images/screenshots/dark-purple-title.png',
    //   dest: 'dashboard',
    //   conf: `{
    //     "navigationPos": "side",
    //     "sidebarStyle": "full",
    //     "dir": "ltr",
    //     "useBreadcrumb": true,
    //     "topbarFixed": true,
    //     "breadcrumb": "simple"
    //   }`,
    //   theme: `{
    //     "name": "egret-dark-purple"
    //   }`
    // },
    // {
    //   name: 'Dark Pink',
    //   photo: 'assets/images/screenshots/dark-pink-title.png',
    //   dest: 'dashboard',
    //   conf: `{
    //     "navigationPos": "side",
    //     "sidebarStyle": "full",
    //     "dir": "ltr",
    //     "useBreadcrumb": true,
    //     "topbarFixed": true,
    //     "breadcrumb": "simple"
    //   }`,
    //   theme: `{
    //     "name": "egret-dark-pink"
    //   }`
    // },
    // {
    //   name: 'Light Blue',
    //   photo: 'assets/images/screenshots/light-blue-title.png',
    //   dest: 'dashboard',
    //   conf: `{
    //     "navigationPos": "side",
    //     "sidebarStyle": "full",
    //     "dir": "ltr",
    //     "useBreadcrumb": true,
    //     "topbarFixed": true,
    //     "breadcrumb": "simple"
    //   }`,
    //   theme: `{
    //     "name": "egret-blue"
    //   }`
    // }
  ]

  // public panelOpenState = false;

  // public listenItems: any[];
  // public hasIconTypeMenuItem: boolean;
  // public iconTypeMenuTitle: string;
  // private menuItemsSub: Subscription;
  // public layoutConf: ILayoutConf;
 

  // private homePS: PerfectScrollbar;
  constructor(
    private router: Router,
    private loader: AppLoaderService,
    public layout: LayoutService,
    private navService: NavigationService,
    private oauthService: OAuthService,
    private renderer: Renderer2
    // public themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.mainVersion = this.versions[0]
  
    // this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    // this.menuItemsSub = this.navService.listenItems$.subscribe(sampleMarketItem => {
    //   this.listenItems = sampleMarketItem;
    //   //Checks item list has any icon type.
    //   this.hasIconTypeMenuItem = !!this.listenItems.filter(
    //     item => item.type === "icon"
    //   ).length;
    // });
    // this.layoutConf = this.layout.layoutConf;
  }

  ngOnDestroy() {
    // if (this.homePS) this.homePS.destroy();
    this.loader.close();
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.homePS = new PerfectScrollbar('.scrollable')
    // });
    var app = document.getElementById('title');

    console.log(this.soundbars);
    this.soundbars.toArray().forEach((soundbar => {
      this.renderer.setStyle(soundbar.nativeElement, 'height', Math.random() * 50 + 'px');
    }));

    var typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
      autoStart: true,
      cursorClassName: 'cursor'
    });
    // (app as HTMLElement).innerHTML = 'YOUR MUSIC CAN CREATE';
    typewriter
    // .deleteChars(24)
    // .pauseFor(1000)
    // .pasteString('Value')
    // .typeString('<span style="color: var(--body-color)">BeatBlender Producer </span>')
    // .pauseFor(300)
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Mix </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Art</span>')
    .pauseFor(1300)
    
    .deleteChars(15)
    .pauseFor(1300)
    .typeString('<span style="color: var(--body-color); font-size: 36px;"></span>')
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Raise </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Donations</span>')
    .pauseFor(1300)
    
    .deleteChars(18)

    .deleteChars(15)
    .pauseFor(1300)
    .typeString('<span style="color: var(--body-color); font-size: 36px;"></span>')
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Simplify </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Licensing</span>')
    .pauseFor(1300)
    
    .deleteChars(18)

    .deleteChars(15)
    .pauseFor(1300)
    .typeString('<span style="color: var(--body-color); font-size: 36px;"></span>')
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Plant </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Trees</span>')
    .pauseFor(1300)
    
    .deleteChars(11)

    // .pauseFor(1400)
    // .typeString('<span style="color: var(--primary-color); font-size: 36px;">Create </span>')
    // .typeString('<span style="color: var(--accent-color); font-size: 36px;">Culture</span>')
    // .deleteChars(14)
    .pauseFor(1400)
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Trace </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Copyrights</span>')
    .pauseFor(1300)
    
    .deleteChars(16)


    .pauseFor(1400)
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Share </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Culture</span>')
    .pauseFor(3000)
    
    .deleteChars(16)

    .pauseFor(1400)
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Grow </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Together</span>')
    .pauseFor(1300)
    
    .deleteChars(16)


    .deleteChars(15)
    .pauseFor(1300)
    .typeString('<span style="color: var(--primary-color); font-size: 36px;">Make </span>')
    .typeString('<span style="color: var(--body-color); font-size: 36px;">A </span>')
    .typeString('<span style="color: var(--accent-color); font-size: 36px;">Change</span>')
    .pauseFor(1300)
    
    .deleteChars(11)
    
    // .pauseFor(1400)
    // .typeString('<span style="color: var(--primary-color); font-size: 42px;">To </span>')
    // .typeString('<span style="color: var(--accent-color); font-size: 42px;">Inspire</span>')
    // .deleteChars(14)
    

    // .typeString('<strong style="color: var(--light-theme); font-size: 42px;">Value</strong>')
    // .deleteChars(48)
    //   .pauseFor(1000)
    //   .deleteChars(28)
    //   .typeString('<strong style="color: var(--body-color)">Are you<span style="color: #27ae60;">In?</span></strong>')
    //   .deleteChars(40)
      .pauseFor(1000)
      .start();
  }

  /****** Remove this (Only for demo) **********/
  goToLicensing() {
    // let origin = window.location.origin;
    // window.location.href = `${origin}/${v.dest}/?layout=${v.conf}`;
    // console.log(!!null);
    
    // this.loader.open();
    this.router.navigateByUrl('/licensing/sample-market')
  }
  goToListen() {
    // this.loader.open();
    this.router.navigateByUrl('/listen/find')
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  


}
