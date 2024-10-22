import { Component,  Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchPokemonByRandomService } from '../services/fetchpokemonbyrandom.service';
import { FetchPokemonByNameOrPokedexNumberService } from '../services/fetchpokemonbynameorpokedexnumber.service';
import { Pokemon } from '../../pokemon.interface';

@Component({
    selector: 'pokemon-card',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div (click)="emitPokemon()">
        @if (pokemonToDisplay) {
        <img [src]="pokemonToDisplay.sprites.front_default" alt="Photo de pokemon" height="100">
        }
    </div>
  `,
})
export class PokemonCard implements OnChanges {
    @Input() nameOrPokedexNumber: string | number = '';
    @Input() getPokemonByRandom: boolean = false;

    @Output() pokemonFetched = new EventEmitter<string>();
    @Output() pokemonClicked = new EventEmitter<Pokemon>();

    pokemonToDisplay!: Pokemon;

    constructor(
        private fetchPokemonByRandomService: FetchPokemonByRandomService,
        private fetchPokemonByNameOrPokedexNumberService: FetchPokemonByNameOrPokedexNumberService
    ) { }

    emitPokemon() {
        console.log('this.pokemonToDisplay', this.pokemonToDisplay)
        this.pokemonClicked.emit(this.pokemonToDisplay);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['nameOrPokedexNumber'] && this.nameOrPokedexNumber) {
            if (typeof this.nameOrPokedexNumber == "string") {
                this.nameOrPokedexNumber = this.nameOrPokedexNumber.toLowerCase()
            }

            this.fetchPokemonByNameOrPokedexNumberService.getPokemonByNameorPokedexNumber(this.nameOrPokedexNumber).subscribe((response: Pokemon) => {
                this.pokemonToDisplay = {
                    name: response.name,
                    sprites: {
                        front_default: response.sprites.front_default,
                    }    
                }
            })

        } else if (this.getPokemonByRandom) {
            this.fetchPokemonByRandomService.getPokemonByRandom().subscribe((response: Pokemon) => {
                this.pokemonToDisplay = {
                    name: response.name,
                    sprites: {
                        front_default: response.sprites.front_default,
                    }    
                }
            })
            this.pokemonFetched.emit('Random pokemon fetched');
        }   
    }
}