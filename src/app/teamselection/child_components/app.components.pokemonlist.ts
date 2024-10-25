import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchPokemonsByTypeService } from '../services/fetchpokemonsbytype.service';
import { NgFor } from '@angular/common';
import { Pokemon } from '../../pokemon.interface';
import { FetchPokemonByNameOrPokedexNumberService } from '../services/fetchpokemonbynameorpokedexnumber.service';
import { FetchPokemonsByGenerationService } from '../services/fetchpokemonsbygeneration.service';

@Component({
    selector: 'pokemon-list',
    standalone: true,
    imports: [RouterOutlet, NgFor],
    template: `
    <span *ngFor="let pokemon of pokemonsList">
        <img [src]="pokemon.sprites.official_front_default" alt="Sprite not downloaded" 
        (click)="emitPokemon(pokemon)" class="pokemon-image">
    </span>
  `,
})
export class PokemonList implements OnChanges {
    @Input() type: string = '';
    @Input() generation: number = -1;

    @Output() pokemonClicked = new EventEmitter<Pokemon>();

    pokemonsList: Pokemon[] = [];

    constructor(
        private fetchPokemonsByTypeService: FetchPokemonsByTypeService, 
        private fetchPokemonsByGenerationService: FetchPokemonsByGenerationService, 
        private fetchPokemonByNameOrPokedexNumberService: FetchPokemonByNameOrPokedexNumberService
    ) { }

    emitPokemon(pokemon: Pokemon) {
        this.pokemonClicked.emit(pokemon);
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['type'] && this.type) {
            try {
                this.pokemonsList = [];

                this.fetchPokemonsByTypeService.getPokemonsByType(this.type).subscribe((response) => {
                    response.forEach(pokemon => {
                        this.pokemonsList.push(pokemon);
                    });
                });
            } catch(error) {
                console.log('error in app.components.pokemonlist.ts: ', error)
            }
        } else if (this.generation && this.generation != -1) {
            try {
                this.pokemonsList = [];

                this.fetchPokemonsByGenerationService.getPokemonsByGeneration(this.generation).subscribe((response) => {
                    response.forEach(pokemon => {
                        this.pokemonsList.push(pokemon);
                    });
                });
            } catch(error) {
                console.log('error in app.components.pokemonlist.ts: ', error)
            }
        }
    }
}