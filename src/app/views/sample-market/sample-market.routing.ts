import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { DownloadSampleComponent } from './download-sample/download-sample.component';
import { Routes } from '@angular/router';
import { SampleMarketComponent } from './sample-market.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';
import { FindAllComponent } from './find-all/find-all.component';
export const SampleMarketRoutes: Routes = [{
  path: '',
  // component: SampleMarketComponent,
  // component: SampleMarketComponent,
  children: [
    {
      path: 'find-all',
      component: FindAllComponent,
      // redirectTo: 'bb-a1',
      // component: SampleMarketComponent,

      data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
      // children: [
      //   {
      //     path: 'choose-license',
      //     component: ChooseCategoryComponent,
      //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' }
      //   },
      //   {
      //     path: 'artists',
      //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
      //     children: [
      //       {
      //         path: ':id',
      //         component: ChooseArtistComponent,
      //         // component: SampleMarketComponent,
      //         data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
      //       },
      //     ]
      //   },
       
      //   {
      //     path: 'all',
      //     component: ChooseArtistComponent,
      //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' }
      //   },
      //   {
      //     path: ':id',
      //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },
      //     children: [
      //       {
      //         path: 'bb-100',
      //         component: SampleMarketComponent,
      //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },

      //       },
      //       {
      //         path: 'bb-70',
      //         component: SampleMarketComponent,
      //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },

      //       },
      //       {
      //         path: 'bb-30',
      //         component: SampleMarketComponent,
      //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses' },

      //       },
      //       {
      //         path: '',
      //         redirectTo: 'bb-100'
      //         // component: SampleMarketComponent,
      //       },
      //     ]
      //   },
      //   {
      //     path: '',
      //     redirectTo: 'choose-license'
      //   }
      // ]

    },
    {
      path: ':artistName',
      // component: SampleMarketComponent,
      children: [
        {
          path: ':artistAliasID',
          component: SampleMarketComponent
        }
      ]
    },
    {
      path: '',
      redirectTo: 'find-all',
      pathMatch: 'full'
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