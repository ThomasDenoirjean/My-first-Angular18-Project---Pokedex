import { Component,  Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchPokemonByRandomService } from './fetchpokemonbyrandom.service';
import { FetchPokemonByNameOrPokedexNumberService } from './fetchpokemonbynameorpokedexnumber.service';
import { Pokemon } from './pokemon.interface';

@Component({
    selector: 'pokemon-card',
    standalone: true,
    imports: [RouterOutlet],
    styleUrl: './app.component.css',
    template: `
    <div (click)="emitPokemonUrl()">
        @if (pokemonImageUrl) {
        <img [src]="pokemonImageUrl" alt="Photo de pokemon" height="100">
        }
    </div>
  `,
})
export class PokemonCard implements OnChanges {
    @Input() nameOrPokedexNumber: string | number = '';
    @Input() getPokemonByRandom: boolean = false;

    @Output() pokemonFetched = new EventEmitter<string>();
    @Output() pokemonClicked = new EventEmitter<string>();

    pokemonImageUrl: string = '';

    constructor(
        private fetchPokemonByRandomService: FetchPokemonByRandomService,
        private fetchPokemonByNameOrPokedexNumberService: FetchPokemonByNameOrPokedexNumberService
    ) { }

    emitPokemonUrl() {
        this.pokemonClicked.emit(this.pokemonImageUrl);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['nameOrPokedexNumber'] && this.nameOrPokedexNumber) {
            if (typeof this.nameOrPokedexNumber == "string") {
                this.nameOrPokedexNumber = this.nameOrPokedexNumber.toLowerCase()
            }

            this.fetchPokemonByNameOrPokedexNumberService.getPokemonByNameorPokedexNumber(this.nameOrPokedexNumber).subscribe((response: Pokemon) => {
                this.pokemonImageUrl = response.sprites.front_default;
            })

        } else if (this.getPokemonByRandom) {
            this.fetchPokemonByRandomService.getPokemonByRandom().subscribe((response: Pokemon) => {
                this.pokemonImageUrl = response.sprites.front_default;
            })
            this.pokemonFetched.emit('Random pokemon fetched');
        }   
    }
}