import { CharityComponent } from './charity.component';
import { Routes } from "@angular/router";

export const CharityRoutes: Routes = [
  

    {
      path: 'projects',
      component: CharityComponent,
      
    },
    {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  }
  
  ]