import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from './pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private pokemonTeamSource = new BehaviorSubject<Pokemon[]>([]);
  pokemonTeam$ = this.pokemonTeamSource.asObservable();

  updateTeam(newTeam: Pokemon[]) {
    this.pokemonTeamSource.next(newTeam);
  }
}