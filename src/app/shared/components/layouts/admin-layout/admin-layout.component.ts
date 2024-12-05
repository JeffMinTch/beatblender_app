import { MatSidenav } from '@angular/material/sidenav';
import { SampleLicensingMarketService } from '../../../../views/sample-market/sample-licensing-market.service';
import { Component, OnInit, AfterViewInit, ViewChild, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { 
  Router, 
  NavigationEnd, 
  RouteConfigLoadStart, 
  RouteConfigLoadEnd, 
  ResolveStart, 
  ResolveEnd 
} from '@angular/router';
import { Subscription } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { LayoutService } from '../../../services/layout.service';
import { filter } from 'rxjs/operators';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';
import { SidenavContent } from '../../../../shared/models/sidenav-content.model';




@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html',
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  
  @ViewChild('notificationPanel', { static: false, read: MatSidenav}) private notificationPanel: MatSidenav;
  @ViewChild('rightsideContentHold', { static: false, read: ElementRef}) private rightsideContentHold: ElementRef;


  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;

  public  scrollConfig = {}
  public layoutConf: any = {};
  public adminContainerClasses: any = {};
  
  constructor(
    private router: Router,
    // public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private jwtAuth: JwtAuthService,
    private sampleLicensingMarketService: SampleLicensingMarketService
  ) {
    // Check Auth Token is valid
    // this.jwtAuth.checkTokenIsValid();

    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((routeChange) => {
      if(routeChange instanceof NavigationEnd) {
        this.layout.adjustLayout({ route: routeChange.url});
        this.scrollToTop();
    }
     
    });
    
    // Translator init
    // const browserLang: string = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    // this.layoutConf = this.layout.layoutConf;
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
        this.layoutConf = layoutConf;
        // console.log(this.layoutConf);
        
        this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
        this.cdr.markForCheck();
    });

    this.layout.scrollTopSubject$.subscribe(() => {
      this.scrollToTop();
    });

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if(event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if(event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });

    this.sampleLicensingMarketService.toggleFilter$.subscribe((data) => {
      switch(data.apply) {
        case SidenavContent.Filter: 
          if(data.toggleState && !this.notificationPanel.opened) {
            this.notificationPanel.open();
          }
      }
    });

    
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }
  
  ngAfterViewInit() {

  }
  
  scrollToTop() {
    if(document) {
      setTimeout(() => {
        // let element;
        const element = (this.rightsideContentHold.nativeElement as HTMLElement);
        // if(this.layoutConf.topbarFixed) {
        //   element = <HTMLElement>document.querySelector('#rightside-content-hold');
        // } else {
        //   element = <HTMLElement>document.querySelector('#main-content-wrap');
        // }
        element.scrollTop = 0;
      })
    }
  }
  ngOnDestroy() {
    if(this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if(this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if(this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }
  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  sidebarMouseenter(e) {
    // console.log(this.layoutConf);
    if(this.layoutConf.sidebarStyle === 'compact') {
        this.layout.publishLayoutChange({sidebarStyle: 'full'}, {transitionClass: true});
    }
  }

  sidebarMouseleave(e) {
    // console.log(this.layoutConf);
    if (
        this.layoutConf.sidebarStyle === 'full' &&
        this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({sidebarStyle: 'compact'}, {transitionClass: true});
    }
  }

  updateAdminContainerClasses(layoutConf) {
    return {
      'navigation-top': layoutConf.navigationPos === 'top',
      'sidebar-full': layoutConf.sidebarStyle === 'full',
      'sidebar-compact': layoutConf.sidebarStyle === 'compact' && layoutConf.navigationPos === 'side',
      'compact-toggle-active': layoutConf.sidebarCompactToggle,
      'sidebar-compact-big': layoutConf.sidebarStyle === 'compact-big' && layoutConf.navigationPos === 'side',
      'sidebar-opened': layoutConf.sidebarStyle !== 'closed' && layoutConf.navigationPos === 'side',
      'sidebar-closed': layoutConf.sidebarStyle === 'closed',
      'fixed-topbar': layoutConf.topbarFixed && layoutConf.navigationPos === 'side'
    }
  }
}