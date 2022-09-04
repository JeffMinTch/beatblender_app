import { UserWebService } from './../web-services/user-web.service';
import { AuthConfig, NullValidationHandler, ValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './../../../../config/auth.config';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { Inject, Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay, filter } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

// ================= only for demo purpose ===========
const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

const DEMO_USER = {
  id: "5b700c45639d2c0c54b354ba",
  displayName: "Watson Joyce",
  role: "SA",
};
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  userInfo: UserInfo;
  userData: any;
  user$ = (new BehaviorSubject<UserInfo>(null));
  public userData$ = (new BehaviorSubject<any>(null));
  tokenEvents: Subject<any> = new Subject<any>();
  signingIn: Boolean;
  return: string;
  // JWT_TOKEN: string;
  APP_USER: string;
  APP_USER_DATA: any;

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userWebService: UserWebService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    // this.route.queryParams
    //   .subscribe(params => this.return = params['return'] || '/');

    //   this.oauthService.events
    //       .pipe(filter((e: any) => {
    //         console.log(e);
            
    //         return e.type === 'token_received';
    //       }))
    //       .subscribe(() => this.handleNewToken());

    
      
  }
  //(username, password)
  // public signin():void {
  //   this.oauthService.initLoginFlow();

    
  //   this.oauthService.loadDiscoveryDocumentAndLogin().then((loggedIn: boolean) => {
  //     if(loggedIn) {
  //       this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
  //         this.setUserAndToken(this.oauthService.getAccessToken(), userInfo, loggedIn);
  //       });
  //       this.oauthService.setupAutomaticSilentRefresh();

        
  //     }  else {
  //       this.setUserAndToken(null, null, false);
  //     }
  //   });

    
  // }

  // trySignin(): Promise<boolean> {
  //   return new Promise<boolean>((resolve, reject) => {
  //     this.oauthService.loadDiscoveryDocumentAndTryLogin().then((isLoggedIn) => {
  //       if (isLoggedIn) {
  //         this.userWebService.tryCreateUser().subscribe((res: any) => {
  //           console.log('User Creation Request');
  //           console.log(res);
  //         });
  //             this.oauthService.setupAutomaticSilentRefresh();
  //             if(this.oauthService.hasValidAccessToken()) {
  //               this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
                  
  //                 this.setUserAndToken(this.oauthService.getAccessToken(), userInfo, this.oauthService.hasValidAccessToken());
  //               });
  //               this.userWebService.getUserData().subscribe((userData) => {
  //                 console.log("User Data");
  //                 console.log(userData);
  //                 this.setUserData(userData);
  //               });
  //             } else {
  //               this.setUserAndToken(null, null, false);
  //             }
  //             resolve(isLoggedIn);
  //           } else {
  //             resolve(isLoggedIn);
  //           }
  //     });
  //   });
  // }

  public tryCreateUser() { 
    this.authService.getAccessTokenSilently().subscribe((accessToken) => {
      
      this.userWebService.tryCreateUser(accessToken).subscribe((data) => {
        console.log('Try Create User');
        console.log(data);
      })
      
    });

  }

  signin() {
    this.authService.loginWithRedirect();
  }

  signout() {
    this.authService.logout({
      returnTo: this.doc.location.origin
    });
  }

  
  // isAuth(): boolean {
  //   if(this.oauthService.hasValidAccessToken()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }



  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  // public checkTokenIsValid(): boolean {
  //   if(this.oauthService.hasValidAccessToken()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // handleNewToken() {
  //   if(this.checkTokenIsValid()) {
  //     this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
  //       this.setUserAndToken(this.oauthService.getAccessToken(), userInfo, this.oauthService.hasValidAccessToken());
  //     });
  //   }
  // }

  // public signout() {
  //   this.setUserAndToken(null, null, false);
  //   this.oauthService.logOut();
  // }


  // public configureAuthSetup(authConfig: AuthConfig, storage: Storage, validationHandler: ValidationHandler) {
  //   this.oauthService.configure(authConfig);
  //       this.oauthService.setStorage(storage);
  //       this.oauthService.tokenValidationHandler = validationHandler;
  // }

  // isLoggedIn(): Boolean {
  //   return !!this.getJwtToken();
  // }

  getJwtToken(): string {
    return '';
    // return this.oauthService.getAccessToken();
    
  }

  
  // getUserInfo(): UserInfo {
  //   return this.ls.getItem(this.APP_USER);
  // }

  // getUserData(): any {

  // }

  // setUserAndToken(token: String, userInfo: UserInfo, isAuthenticated: Boolean) {
  //   this.isAuthenticated = isAuthenticated;
  //   this.token = token;
  //   this.userInfo = userInfo;
  //   console.log('User Info');
  //   console.log(userInfo);
  //   this.user$.next(userInfo);
  //   this.ls.setItem(this.JWT_TOKEN, token);
  //   this.ls.setItem(this.APP_USER, userInfo);
  // }

  // setUserData(userData: any) {
  //   this.userData$.next(userData);
  //   this.userData = userData;
  //   this.ls.setItem(this.APP_USER_DATA, userData);
  // }

  // getRole(): string {
  //   // console.log(this.)
  //   const roles: Array<string> = this.userInfo['realm_access'].roles;
  //   if(roles.includes('app-super-admin')) {
  //     return 'Super Admin';
  //   } else if (roles.includes('app-admin')) {
  //     return 'Admin';
  //   } else if(roles.includes('app-mitarbeiter')) {
  //     return 'Mitarbeiter';
  //   } else if(roles.includes('app-business-user')) {
  //     return 'Händler';
  //   } else if (roles.includes('app-user')) {
  //     return 'Kunde';
  //   }
  // }


}
