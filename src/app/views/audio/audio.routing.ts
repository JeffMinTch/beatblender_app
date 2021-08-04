import { DetailsModule } from './details/details.module';
import { AudioComponent } from './audio.component';
import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';

export const AudioRoutes: Routes = [
    {
    path: '',
    component: AudioComponent,
    // data: { title: 'Sample Market', breadcrumb: 'Audio'},
    children: [
      {
        path: '',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
        data: { title: 'Sample Market', breadcrumb: 'Audio'}
      },
    //   {
    //     path: 'download/:id',
    //     component: DetailsComponent,
    //     data: { title: 'Detail', breadcrumb: 'Detail'}
    //   },
  
  
  
    //     {
    //   path: 'basic-licenses',
    //   component: BasicLicensesComponent,
    //   data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
    // }, 
    // {
    //   path: 'full-licenses',
    //   component: FullLicensesComponent,
    //   data: { title: 'Full Licenses', breadcrumb: 'Full Licenses'}
    // }, 
    // {
    //   path: 'how-it-works',
    //   component: HowItWorksComponent,
    //   data: { title: 'Cart', breadcrumb: 'How it works'}
    // },
    // {
    //   path: 'dashboard',
    //   loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    //   canActivate: [AuthGuard],
    //   data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
    // },
    // {
    //   path: 'profile',
    //   loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
    //   data: { title: 'Profile', breadcrumb: 'PROFILE'}
    // },
    // {
    //   path: 'forms',
    //   loadChildren: () => import('../forms/forms.module').then(m => m.AppFormsModule),
    //   data: { title: 'Forms', breadcrumb: 'FORMS'}
    // },
    // {
    //   path: 'docs',
    //   loadChildren: () => import('../documentation/documentation.module').then(m => m.DocumentationModule),
    //   data: { title: 'docs', breadcrumb: 'Docs'}
    // },
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