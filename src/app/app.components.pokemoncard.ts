import { Component,  Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchPokemonByRandomService } from './fetchpokemonbyrandom.service';
import { FetchPokemonByNameOrPokedexNumberService } from './fetchpokemonbynameorpokedexnumber.service';
import { Pokemon } from './pokemon.interface';

// doit recevoir un pokémon soit aléatoire soit avec un id spécific -- ex private _pageId: string | number;

@Component({
    selector: 'pokemon-card',
    standalone: true,
    imports: [RouterOutlet],
    styleUrl: './app.component.css',
    template: `
    @if (pokemonImageUrl) {
    <img [src]="pokemonImageUrl" alt="Photo de pokemon" height="100">
    }
  `,
})
export class PokemonCard implements OnChanges {
    @Input() nameOrPokedexNumber: string | number = '';
    @Input() getPokemonByRandom: boolean = false;

    @Output() pokemonFetched = new EventEmitter<string>();

    pokemonImageUrl: string = '';

    constructor(
        private fetchPokemonByRandomService: FetchPokemonByRandomService,
        private fetchPokemonByNameOrPokedexNumberService: FetchPokemonByNameOrPokedexNumberService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changing ...')

        if (changes['nameOrPokedexNumber'] && this.nameOrPokedexNumber) {
            if (typeof this.nameOrPokedexNumber == "string") {
                this.nameOrPokedexNumber = this.nameOrPokedexNumber.toLowerCase()
            }

            console.log('this.nameOrPokedexNumber', this.nameOrPokedexNumber)

            this.fetchPokemonByNameOrPokedexNumberService.getPokemonByNameorPokedexNumber(this.nameOrPokedexNumber).subscribe((response: Pokemon) => {
                this.pokemonImageUrl = response.sprites.front_default;
            })
        } else if (this.getPokemonByRandom) {
            console.log('fetching random pokemon')
            this.fetchPokemonByRandomService.getPokemonByRandom().subscribe((response: Pokemon) => {
                this.pokemonImageUrl = response.sprites.front_default;
            })
            this.pokemonFetched.emit('Random pokemon fetched');
        }   
    }
}