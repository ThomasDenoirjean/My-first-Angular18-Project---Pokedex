import {Routes} from '@angular/router';

import {TeamSelectionComponent} from './app.component.teamselection';
import {PokemonMovesBrower} from './app.component.movesbrowser';

export const routes: Routes = [
  {
    path: '',
    title: 'Select your pokemon team',
    component: TeamSelectionComponent,
  },
  {
    path: 'moves',
    title: 'Browse throw pokemon moves',
    component: PokemonMovesBrower,
  },
];