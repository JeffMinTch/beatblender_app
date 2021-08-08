import { DetailsComponent } from './details.component';
import { Routes } from '@angular/router';

export const DetailsRoutes: Routes = [
    {
        path: ':id',
        component: DetailsComponent,
        data: { title: 'Details', breadcrumb: 'Details' }
        
        // children: [
        //     {
        //         path: 'track/:id',
        //         component: DetailsComponent,

        //         // loadChildren: () => import('./details/details.component').then(m => m.DetailsComponent),
        //         data: { title: 'Sample Market', breadcrumb: 'Details' }
        //     },
        //     //   {
        //     //     path: 'download/:id',
        //     //     component: DetailsComponent,
        //     //     data: { title: 'Detail', breadcrumb: 'Detail'}
        //     //   },

        // ]
    }]