import { SidenavComponent } from './sidenav.component';
import { Routes } from '@angular/router';


export const SidenavRoutes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'sample-market',
        loadChildren: () => import('../../views/licensing/licensing.module').then(m => m.LicensingModule),
        data: { title: 'Licensing', breadcrumb: 'Get Sample Licenses'}
      },
      {
        path: 'listen',
        loadChildren: () => import('../../views/music-platform/music-platform.module').then(m => m.MusicPlatformModule),
        data: { title: 'Listen', breadcrumb: 'All Music'}
      },
      {
        path: 'profile',
        loadChildren: () => import('../../views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'Profile' }
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
      // {
      //   path: 'licensing',
      //   loadChildren: () => import('../../views/licensing/licensing.module').then(m => m.LicensingModule),
      //   data: { title: 'Audio' }
      // },
      
      
    ]
  }

]
