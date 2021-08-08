import { DownloadSampleComponent } from './download-sample/download-sample.component';
import { Routes } from '@angular/router';
import { SampleMarketComponent } from './sample-market.component';
export const SampleMarketRoutes: Routes = [{
  path: '',
  // component: SampleMarketComponent,
  // component: SampleMarketComponent,
  children: [
    {
      path: '',
      // redirectTo: 'bb-a1',
      // component: SampleMarketComponent,
      
      data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'},
      children: [
        {
          path: ':id',
          component: SampleMarketComponent,
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
        },
        
        // {
        //   path: '/:id',
        //   component: SampleMarketComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
        // },
        // {
        //   path: '/:id',
        //   component: SampleMarketComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
        // },
        // {
        //   path: '/:id',
        //   component: SampleMarketComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
        // },
        // {
        //   path: '/:id',
        //   component: SampleMarketComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
        // },
        // {
        //   path: '/:id',
        //   component: SampleMarketComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
        // },
        // {
        //   path: '/:id',
        //   component: UnderConstructionComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
        // },
        {
          path: '',
          redirectTo: 'bb-a1'
        }

      ]
    },
  ],
  
  // {
  //   path: 'full-licenses',
  //   component: FullLicensesComponent,
  //   data: { title: 'Full Licenses', breadcrumb: 'Full Licenses'}
  // }, 
  // {
  //   path: 'how-it-works',
  //   component: HowItWorksComponent,
  //   data: { title: 'Cart', breadcrumb: 'How it works'}
  // }
  //   {
  //     path: 'upload-samples',
  //     component: CheckoutComponent,
  //     data: { title: 'Checkout', breadcrumb: 'CHECKOUT' }
  //   }
  // ]
}
]