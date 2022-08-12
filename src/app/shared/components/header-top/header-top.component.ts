import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
// import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, AfterViewInit ,OnDestroy {

  @ViewChild('artistImage') public artistImage: ElementRef<HTMLImageElement>;

  layoutConf: any;
  menuItems:any;
  menuItemSub: Subscription;
  egretThemes: any[] = [];
  currentLang = 'en';
  userData: any;
  availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }]
  @Input() notificPanel;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    // public translate: TranslateService,
    public jwtAuth: JwtAuthService,
    private oauthService: OAuthService

  ) { }
  ngAfterViewInit(): void {
    this.jwtAuth.userData$.subscribe(userData => {
      let that = this;
      setTimeout(() => {
        this.userData = userData;
        // alert(userData);
        console.log(userData);
        
        (this.artistImage.nativeElement as HTMLImageElement).src = `http://localhost:9090/api/web/protected/media/artist-image/${this.userData.artistAlias.artistALiasID}`;

      }, 500);
    });
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
    this.menuItemSub = this.navService.menuItems$
    .subscribe(res => {
      res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
      let limit = 4
      let mainItems:any[] = res.slice(0, limit)
      if(res.length <= limit) {
        return this.menuItems = mainItems
      }
      let subItems:any[] = res.slice(limit, res.length - 1)
      mainItems.push({
        name: 'More',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems
      });
      this.menuItems = mainItems
      // console.log(this.menuItems);
    })

    
  }
  ngOnDestroy() {
    this.menuItemSub.unsubscribe()
  }
  // setLang() {
  //   this.translate.use(this.currentLang)
  // }
  changeTheme(theme) {
    this.layout.publishLayoutChange({matTheme: theme.name})
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }
  isAuth(): boolean {
    return this.jwtAuth.isAuth();
    // if(this.oauthService.hasValidAccessToken()) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  public logoff() {
    this.oauthService.logOut();
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  getRole():string {
    if(this.jwtAuth.getRole()) {
      return this.jwtAuth.getRole();
    }
  }
}
