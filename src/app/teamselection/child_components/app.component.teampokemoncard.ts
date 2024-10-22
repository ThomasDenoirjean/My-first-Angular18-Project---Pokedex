import { Component,  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from '../../pokemon.interface';

@Component({
    selector: 'team-pokemon-card',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div (click)="removePokemonUrl()">
        @if (pokemon) {
        <img [src]="pokemon.sprites.front_default" alt="Photo de pokemon" height="100">
        }
    </div>
  `,
})
export class TeamPokemonCard implements OnInit {
    @Input() pokemon!: Pokemon;

    @Output() pokemonToRemove = new EventEmitter<Pokemon>();

    ngOnInit(): void { }

    removePokemonUrl() {
        this.pokemonToRemove.emit(this.pokemon)
    }
}    