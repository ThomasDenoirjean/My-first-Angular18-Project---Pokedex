import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PokemonCard } from './app.components.pokemoncard';
import { PokemonList } from './app.components.pokemonlist';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonCard, PokemonList, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  type = '';
  generation!: number;
  getPokemonByRandom: boolean = false;
  nameOrPokedexNumber: string | number = ''

  changeGetPokemonByRandomValue() {
    console.log('click')
    this.getPokemonByRandom = !this.getPokemonByRandom
  }  
}
