import { Routes } from '@angular/router';
import { HeroesListComponent } from '@modules/heroes-list/heroes-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/heroes-list',
  },
  {
    path: 'heroes-list',
    component: HeroesListComponent,
  }
];
