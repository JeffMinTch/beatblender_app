import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FullLicensesComponent } from './full-licenses/full-licenses.component';
import { Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { LicensingComponent } from './licensing/licensing.component';
import { DownloadSampleComponent } from './sample-market/download-sample/download-sample.component';
import { UnderConstructionComponent } from 'app/shared/components/under-construction/under-construction.component';


export const LicensingRoutes: Routes = [
  {
  path: '',
  component: LicensingComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./sample-market/sample-market.module').then(m => m.SampleMarketModule),
      data: { title: 'Sample Market', breadcrumb: 'Sample Market'}
    },
    {
      path: 'license-register',
      loadChildren: () => import('../../views/licensing/license-register/license-register.module').then(m => m.LicenseRegisterModule),
      data: { title: 'License Register', breadcrumb: 'License Register'}
    },
    {
      path: 'faq',
      component: UnderConstructionComponent,
      data: { title: 'License Register', breadcrumb: 'License Register'}
    },
    {
      path: 'download/:id',
      component: DownloadSampleComponent,
      data: { title: 'Download', breadcrumb: 'Download'}
    },
  //     {
  //   path: 'basic-licenses',
  //   component: BasicLicensesComponent,
  //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
  // }, 
  {
    path: 'full-licenses',
    component: FullLicensesComponent,
    data: { title: 'Full Licenses', breadcrumb: 'Full Licenses'}
  }, 
  {
    path: 'how-it-works',
    component: HowItWorksComponent,
    data: { title: 'Cart', breadcrumb: 'How it works'}
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
    data: { title: 'Profile', breadcrumb: 'PROFILE'}
  },
  {
    path: 'forms',
    loadChildren: () => import('../forms/forms.module').then(m => m.AppFormsModule),
    data: { title: 'Forms', breadcrumb: 'FORMS'}
  },
  {
    path: 'docs',
    loadChildren: () => import('../documentation/documentation.module').then(m => m.DocumentationModule),
    data: { title: 'docs', breadcrumb: 'Docs'}
  },
  // {
  //   path: 'my-licenses',
  //   component: MyLicensesComponent,
  //   data: { title: 'My Licenses', breadcrumb: 'My Licenses' }
  // },
  // {
  //   path: 'my-licenses',
  //   loadChildren: () => import('./my-licenses/my-licenses.module').then(m => m.MyLicensesModule),
  //   data: { title: 'my-licenses', breadcrumb: 'My Licenses'}
  // },
//   {
//     path: 'upload-samples',
//     component: CheckoutComponent,
//     data: { title: 'Checkout', breadcrumb: 'CHECKOUT' }
//   }
]
}]