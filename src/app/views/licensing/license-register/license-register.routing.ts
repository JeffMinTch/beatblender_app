import { UnderConstructionComponent } from './../../../shared/components/under-construction/under-construction.component';
import { Routes } from '@angular/router';

export const LicenseRegisterRoutes: Routes = [
    {
        path: '',
        component: UnderConstructionComponent,
        data: { title: 'License Register', breadcrumb: 'License Register' }
    }
];