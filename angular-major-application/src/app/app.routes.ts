import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'major', pathMatch: 'full'},
    {
        path: 'major',
        loadComponent: () =>
          import('./major/major.component').then(
            (m) => m.MajorComponent
          ),
      },
      
      { path: '**', redirectTo: 'major' },
];


