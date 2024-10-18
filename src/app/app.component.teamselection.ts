import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonCard } from './app.components.pokemoncard';
import { PokemonList } from './app.components.pokemonlist';
import { TeamPokemonCard } from './app.component.teampokemoncard';
import {RouterOutlet, RouterLink} from '@angular/router';

@Component({
  selector: 'team-selection',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PokemonCard, PokemonList, TeamPokemonCard, FormsModule, CommonModule],
  templateUrl: './app.component.teamselection.html',
  styleUrl: './app.component.css'
})
export class TeamSelectionComponent {
  type = '';
  generation!: number;
  getPokemonByRandom: boolean = false;
  nameOrPokedexNumber: string | number = ''
  pokemonsToDisplayUrls: string[] = []
  displayMode: string = ''

  private NUMBER_OF_POKEMON_TO_DISPLAY: number = 6;

  changeGetPokemonByRandomValue() {
    console.log('click')
    this.getPokemonByRandom = !this.getPokemonByRandom
  }

  onPokemonClicked(pokemonUrl: string) {
    if (this.pokemonsToDisplayUrls.length <= this.NUMBER_OF_POKEMON_TO_DISPLAY - 1) {
      this.pokemonsToDisplayUrls.push(pokemonUrl) 
    }
  }

  onPokemonToRemove(pokemonUrl: string) {
    this.pokemonsToDisplayUrls.splice(this.pokemonsToDisplayUrls.indexOf(pokemonUrl), 1)
  }
}
