import { Routes } from '@angular/router';
import { FaqComponent } from './faq.component';

export const FaqRoutes: Routes = [
    {
        path: '',
        data: { title: 'Details', breadcrumb: 'Details' },
        children: [
            {
                path: '',
                component: FaqComponent,
            data: { title: 'docs', breadcrumb: 'Docs' }
          },
          
        ]

       
    },
    
 
];