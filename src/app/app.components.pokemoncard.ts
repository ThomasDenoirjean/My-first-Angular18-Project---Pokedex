import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchRandomPokemonService } from './fetchrandompokemon.service';
import { Pokemon } from './pokemon.interface';

@Component({
    selector: 'pokemon-card',
    standalone: true,
    imports: [RouterOutlet],
    styleUrl: './app.component.css',
    template: `
    <h1> ceci est une photo de pokemon </h1>
    @if (pokemonImageUrl) {
    <h1> PokeURL : {{ pokemonImageUrl }} </h1>
    <img [src]="pokemonImageUrl" alt="Photo de pokemon" width="400">
    }
  `,
})
export class PokemonCard implements OnInit {
    pokemonImageUrl: string = '';

    constructor(private fetchRandomPokemonService: FetchRandomPokemonService) { }

    ngOnInit(): void {
        this.fetchRandomPokemonService.getRandomPokemon().subscribe((response: Pokemon) => {
            this.pokemonImageUrl = response.sprites.front_default;
        })
    }
}