import { Component,  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from '../../pokemon.interface';

@Component({
    selector: 'team-pokemon-card',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div (click)="removePokemon()">
        @if (pokemon) {
        <img [src]="pokemon.sprites.official_front_default" alt="Photo de pokemon" class="team-pokemon-image">
        }
    </div>
  `,
})
export class TeamPokemonCard implements OnInit {
    @Input() pokemon!: Pokemon;

    @Output() pokemonToRemove = new EventEmitter<Pokemon>();

    ngOnInit(): void { 
    }

    //// FIXME le problème vient du fait qu'ils ont tous les meme AppId une fois dans la page MovesBrowser

    removePokemon() {
        this.pokemonToRemove.emit(this.pokemon)
    }
}    