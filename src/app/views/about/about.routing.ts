import { UnderConstructionComponent } from './../../shared/components/under-construction/under-construction.component';
import { Routes } from '@angular/router';

export const AboutRoutes: Routes = [
    
    {
        path: '',
        // component: UnderConstructionComponent,
        data: { title: 'Details', breadcrumb: 'Details' },
        children: [
            {
                path: '',
                loadChildren: () => import('../documentation/documentation.module').then(m => m.DocumentationModule),
                data: { title: 'docs', breadcrumb: 'Docs' }
            },

        ]

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
    },


    // {
    //     path: 'docs',
    //     loadChildren: () => import('../documentation/documentation.module').then(m => m.DocumentationModule),
    //     data: { title: 'docs', breadcrumb: 'Docs' }
    //   },
];