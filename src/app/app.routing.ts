import { ProfileModule } from './views/profile/profile.module';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DownloadSampleComponent } from './views/sample-market/download-sample/download-sample.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'sample-market/bb-a1',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  //   data: { title: 'Choose A Demo' }
  // },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'sample-market',
      //   loadChildren: () => import('./views/licensing/licensing.module').then(m => m.LicensingModule),
      //   data: { title: 'Licensing', breadcrumb: 'Get Sample Licenses'}
      // },
      // {
      //   path: 'listen',
      //   loadChildren: () => import('./views/music-platform/music-platform.module').then(m => m.MusicPlatformModule),
      //   data: { title: 'Listen', breadcrumb: 'All Music'}
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
      //   data: { title: 'Profile', breadcrumb: 'Profile' }
      // },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
      //   data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
      // },
      {
        path: '',
        loadChildren: () => import('./views/sidenav/sidenav.module').then(m => m.SidenavModule),
        data: { title: 'Choose A Demo' }
      },
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
        data: { title: 'Choose A Demo' }
      },
      {
        path: 'download/:id',
        component: DownloadSampleComponent,
        data: { title: 'Download', breadcrumb: 'Download'}
      },
      {
        path: 'details',
        loadChildren: () => import('./views/audio/details/details.module').then(m => m.DetailsModule),
        data: { title: 'Sample Details', breadcrumb: 'Sample Details'}
      },
      // {
      //   path: 'audio',
      //   loadChildren: () => import('./views/audio/audio.module').then(m => m.AudioModule),
      //   data: { title: 'Audio' }
      // },
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'sessions/404'
  // }
];

