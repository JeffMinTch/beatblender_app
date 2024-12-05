import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
// import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('artistImage') public artistImage: ElementRef<HTMLImageElement>;

  layoutConf: any;
  menuItems: any;
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
    // private oauthService: OAuthService,
    public auth: AuthService

  ) { }
  ngAfterViewInit(): void {
    this.jwtAuth.userData$.subscribe(userData => {
      let that = this;
      setTimeout(() => {
        this.userData = userData;
        // alert(userData);
        console.log(userData);

        // (this.artistImage.nativeElement as HTMLImageElement).src = `http://localhost:9090/api/web/protected/media/artist-image/${this.userData.artistAlias.artistALiasID}`;

      }, 500);
    });
    this.auth.isAuthenticated$.subscribe((isAuth: boolean) => {
      console.log('IS Authenticated');
      console.log(isAuth);
      if (isAuth) {
        this.jwtAuth.tryCreateUser();
        this.auth.user$.subscribe((userData) => {
          console.log('User Data' + userData.picture);
          if (userData) {
            setTimeout(() => {

              (this.artistImage.nativeElement as HTMLImageElement).src = userData.picture;
            }, 500);

          }
        });


      }

    });

    this.auth.appState$.subscribe((data) => {
      console.log('APPSTATE');
      console.log(data);
    });
    this.auth.isLoading$.subscribe((data) => {
      console.log('IS LOADING');
      console.log(data);
    });
    this.auth.user$.subscribe((data) => {
      console.log('USER');
      console.log(data);
    });
    this.auth.error$.subscribe((data) => {
      console.log('Error');
      console.log(data);
    });
    this.auth.idTokenClaims$.subscribe((data) => {
      console.log('ID TOken Claims');
      console.log(data);
    });


  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
    this.menuItemSub = this.navService.menuItems$
      .subscribe(res => {
        res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
        let limit = 4
        let mainItems: any[] = res.slice(0, limit)
        if (res.length <= limit) {
          return this.menuItems = mainItems
        }
        let subItems: any[] = res.slice(limit, res.length - 1)
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
    this.layout.publishLayoutChange({ matTheme: theme.name })
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }
  // isAuth(): boolean {
  //   return this.jwtAuth.isAuth();
  //   // if(this.oauthService.hasValidAccessToken()) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  // }
  // public logoff() {
  //   this.oauthService.logOut();
  // }

  // login(): void {
  //   this.oauthService.initLoginFlow();
  // }

  // getRole(): string {
  //   if (this.jwtAuth.getRole()) {
  //     return this.jwtAuth.getRole();
  //   }
  // }
}
