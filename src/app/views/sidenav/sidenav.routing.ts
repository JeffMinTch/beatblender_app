import { SidenavComponent } from './sidenav.component';
import { Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth.guard';


export const SidenavRoutes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'licensing',
        loadChildren: () => import('../../views/licensing/licensing.module').then(m => m.LicensingModule),
        data: { title: 'Licensing' }
      },
      // {
      //   path: 'sample-market',
      //   loadChildren: () => import('../../views/sample-market/sample-market.module').then(m => m.SampleMarketModule),
      //   data: { title: 'Sample Market', breadcrumb: 'Sample Market'}
      // },
      {
        path: 'listen',
        loadChildren: () => import('../../views/music-platform/music-platform.module').then(m => m.MusicPlatformModule),
        data: { title: 'Listen', breadcrumb: 'All Music'}
      },
      {
        path: 'profile',
        loadChildren: () => import('../../views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'Profile' },
        canActivate: [AuthGuard],

      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
      },
      {
        path: 'audio',
        loadChildren: () => import('../../views/audio/audio.module').then(m => m.AudioModule),
        data: { title: 'Audio' }
      },
      {
        path: 'about',
        loadChildren: () => import('../../views/about/about.module').then(m => m.AboutModule),
        data: { title: 'Audio' }
      },
      
    ]
  }

]
