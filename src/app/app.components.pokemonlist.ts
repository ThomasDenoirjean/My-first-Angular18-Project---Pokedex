import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchPokemonByTypeService } from './fetchpokemonbytype.service';
import { NgFor } from '@angular/common';
import { Pokemon } from './pokemon.interface';
import { FetchPokemonByNameService } from './fetchpokemonbyname.service';

// pour la suite : passer les urls des pokemons en input.

@Component({
    selector: 'pokemon-list',
    standalone: true,
    imports: [RouterOutlet, NgFor ],
    styleUrl: './app.component.css',
    template: `
    <h1> Pokemon list </h1>
    <span *ngFor="let pokemonImageUrl of pokemonUrlList">
        <img [src]="pokemonImageUrl" alt="Photo de pokemon" height="100">
    </span>
  `,
})
export class PokemonList implements OnInit {
    pokemonUrlList: string[] = [];

    constructor(
        private fetchPokemonByTypeService: FetchPokemonByTypeService, 
        private fetchPokemonByNameService: FetchPokemonByNameService
    ) { }

    ngOnInit(): void {
        this.fetchPokemonByTypeService.getPokemonsByType().subscribe((response) => {
            response.forEach(pokemon => {
                this.fetchPokemonByNameService.getPokemonByName(pokemon.name).subscribe((pokemonDetail: Pokemon) => {
                    this.pokemonUrlList.push(pokemonDetail.sprites.front_default);
                });
            });
        });
    }
}