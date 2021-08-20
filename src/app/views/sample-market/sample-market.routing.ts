import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { DownloadSampleComponent } from './download-sample/download-sample.component';
import { Routes } from '@angular/router';
import { SampleMarketComponent } from './sample-market.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';
export const SampleMarketRoutes: Routes = [{
  path: '',
  // component: SampleMarketComponent,
  // component: SampleMarketComponent,
  children: [
    {
      path: 'bb-license',
      // redirectTo: 'bb-a1',
      // component: SampleMarketComponent,

      data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
      children: [
        // {
        //   path: 'samples',
        //   component: SampleMarketComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' }
        // },
        {
          path: 'choose-license',
          component: ChooseCategoryComponent,
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' }
        },
        {
          path: 'artists',
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
          children: [
            {
              path: ':id',
              component: ChooseArtistComponent,
              // component: SampleMarketComponent,
              data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
            },
            // {
            //   path: '',
            //   component: ChooseArtistComponent
            // },
          ]
        },
        // {
        //   path: ':id',
        //   component: SampleMarketComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
        // },
        // {
        //   path: 'bb-70',
        //   component: ChooseArtistComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' }
        // },
        // {
        //   path: 'bb-30',
        //   component: ChooseArtistComponent,
        //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' }
        // },
        {
          path: 'all',
          component: ChooseArtistComponent,
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' }
        },
        {
          path: ':id',
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
          children: [
            {
              path: 'bb-100',
              component: SampleMarketComponent,
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },

            },
            {
              path: 'bb-70',
              component: SampleMarketComponent,
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },

            },
            {
              path: 'bb-30',
              component: SampleMarketComponent,
          data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },

            },
            {
              path: '',
              redirectTo: 'bb-100'
              // component: SampleMarketComponent,
            },
          ]
        },
        {
          path: '',
          redirectTo: 'choose-license'
        }
      ]

    },
    {
      path: '',
      redirectTo: 'bb-license'
    }
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