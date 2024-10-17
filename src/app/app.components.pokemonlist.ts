import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchPokemonsByTypeService } from './fetchpokemonsbytype.service';
import { NgFor } from '@angular/common';
import { Pokemon } from './pokemon.interface';
import { FetchPokemonByNameOrPokedexNumberService } from './fetchpokemonbynameorpokedexnumber.service';
import { FetchPokemonsByGenerationService } from './fetchpokemonsbygeneration.service';

// pour la suite : passer les urls des pokemons en inputde pokemon card
// mettre un defer avec une petite animation de pokéball

// doit recevoir une liste soit de pokémon par type soir par génération

@Component({
    selector: 'pokemon-list',
    standalone: true,
    imports: [RouterOutlet, NgFor ],
    styleUrl: './app.component.css',
    template: `
    <span *ngFor="let pokemonImageUrl of pokemonUrlList">
        <img [src]="pokemonImageUrl" alt="Sprite not downloaded" height="100" (click)="emitPokemonUrl(pokemonImageUrl)">
    </span>
  `,
})
export class PokemonList implements OnChanges {
    @Input() type: string = '';
    @Input() generation: number = -1;

    @Output() pokemonClicked = new EventEmitter<string>();

    pokemonUrlList: string[] = [];

    constructor(
        private fetchPokemonsByTypeService: FetchPokemonsByTypeService, 
        private fetchPokemonsByGenerationService: FetchPokemonsByGenerationService, 
        private fetchPokemonByNameOrPokedexNumberService: FetchPokemonByNameOrPokedexNumberService
    ) { }

    emitPokemonUrl(pokemonUrl: string) {
        this.pokemonClicked.emit(pokemonUrl);
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['type'] && this.type) {
            try {
                this.pokemonUrlList = [];

                this.fetchPokemonsByTypeService.getPokemonsByType(this.type).subscribe((response) => {
                    response.forEach(pokemon => {
                        this.fetchPokemonByNameOrPokedexNumberService.getPokemonByNameorPokedexNumber(pokemon.name).subscribe((pokemonDetail: Pokemon) => {
                            this.pokemonUrlList.push(pokemonDetail.sprites.front_default);
                        });
                    });
                });
            } catch(error) {
                console.log('error in app.components.pokemonlist.ts: ', error)
            }
        } else if (this.generation && this.generation != -1) {
            try {
                this.pokemonUrlList = [];

                this.fetchPokemonsByGenerationService.getPokemonsByGeneration(this.generation).subscribe((response) => {
                    response.forEach(pokemon => {
                        this.fetchPokemonByNameOrPokedexNumberService.getPokemonByNameorPokedexNumber(pokemon.name).subscribe((pokemonDetail: Pokemon) => {
                            this.pokemonUrlList.push(pokemonDetail.sprites.front_default);
                        });
                    });
                });
            } catch(error) {
                console.log('error in app.components.pokemonlist.ts: ', error)
            }
        }
    }
}