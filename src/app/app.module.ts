import { AuthConfigModule } from './../config/auth.config.module';
// import { StateManagerService } from './shared/services/state-manager.service';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { GestureConfig } from '@angular/material/core';
// import { 
//   PerfectScrollbarModule, 
//   PERFECT_SCROLLBAR_CONFIG, 
//   PerfectScrollbarConfigInterface
// } from 'ngx-perfect-scrollbar';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/loader';
import { load_font } from '../app.init';
import { config } from 'rxjs';
import { E } from '@angular/cdk/keycodes';

// AoT requires an exported function for factories
// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient);
// }

// export function stateManagerFactory(stateManagerService: StateManagerService) {
//   return () => stateManagerService.load();
// }

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };





@NgModule({
  imports: [
    // AuthConfigModule,
    BrowserModule,  
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    //PerfectScrollbarModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }),
    AuthModule.forRoot({
      ... env.auth,
      httpInterceptor: {
        allowedList: [
          // Attach access tokens to any calls to '/api' (exact match)
          // '/api',
    
          // Attach access tokens to any calls that start with '/api/'
          // '/api/web/*',
          {
            // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
            uri: '/api/web/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: env.auth.audience,
    
              // The attached token should have these scopes
              // scope: 'read:current_user'
            }
          }
          // Match anything starting with /api/products, but also allow for anonymous users.
          // {
          //   uri: '/api/products/*',
          //   allowAnonymous: true,
          // },
    
          // // Match anything starting with /api/accounts, but also specify the audience and scope the attached
          // // access token must have
          // {
          //   uri: '/api/accounts/*',
          //   tokenOptions: {
          //     audience: 'http://my-api/',
          //     scope: 'read:accounts',
          //   },
          // },
    
          // // Matching on HTTP method
          // {
          //   uri: '/api/orders',
          //   httpMethod: HttpMethod.Post,
          //   tokenOptions: {
          //     audience: 'http://my-api/',
          //     scope: 'write:orders',
          //   },
          // },
    
          // // Using an absolute URI
          // {
          //   uri: 'https://your-domain.auth0.com/api/v2/users',
          //   tokenOptions: {
          //     audience: 'https://your-domain.com/api/v2/',
          //     scope: 'read:users',
          //   },
          // },
        ],
      },
    }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true}),
    RouterModule.forRoot(rootRouterConfig, { useHash: false, scrollPositionRestoration: 'enabled' }),
  ],
  
  // BasicLicensesComponent
  declarations: [AppComponent],
  providers: [
    // { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { 
      provide: APP_INITIALIZER, 
      useFactory: load_font, 
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    
    // { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    // REQUIRED IF YOU USE JWT AUTHENTICATION
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
    // StateManagerService,
    // { provide: APP_INITIALIZER, useFactory: stateManagerFactory, deps: [StateManagerService], multi: true },
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  
}