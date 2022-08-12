import { UnderConstructionComponent } from '../..//shared/components/under-construction/under-construction.component';
import { DocumentationComponent } from './documentation.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { Routes } from '@angular/router';
export const DocsRoutes: Routes = [{
  path: '',
  component: DocumentationComponent,
  children: [
    {
      path: 'introduction',
      component: IntroductionComponent,
      // data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
    },
    {
      path: 'how-to-get-a-license',
      component: UnderConstructionComponent,
      // data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
    },
    {
      path: 'sampling-rules',
      component: UnderConstructionComponent,
      // data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
    },
    {
      path: 'video-tutorials',
      component: UnderConstructionComponent,
      // data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
    },

    {
      path: 'partners',
      component: UnderConstructionComponent,
      // data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
    },
    {
      path: 'faq',
      children: [
        {
          path: '',
          loadChildren: () => import('../about/faq/faq.module').then(m => m.FaqModule),
              data: { title: 'docs', breadcrumb: 'Docs' }
          // },
    },
    
  ]

  // component: FaqComponent,
  // data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
},
{
  path: '',
  redirectTo: 'introduction',
  pathMatch: 'full'
}

]
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
}];