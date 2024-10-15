import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonCard } from './app.components.pokemoncard';
import { HelloWorld } from './app.component.helloworld';
import { PokemonList } from './app.components.pokemonlist';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HelloWorld, PokemonCard, PokemonList],
  template: `
  <pokemon-list />
  <pokemon-card />
  <hello-world />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
}
