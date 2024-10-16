import { Component,  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from './pokemon.interface';

@Component({
    selector: 'team-pokemon-card',
    standalone: true,
    imports: [RouterOutlet],
    styleUrl: './app.component.css',
    template: `
    <div (click)="removePokemonUrl()">
        @if (pokemonUrl) {
        <img [src]="pokemonUrl" alt="Photo de pokemon" height="100">
        }
    </div>
  `,
})
export class TeamPokemonCard implements OnInit {
    @Input() pokemonUrl: string = '';

    @Output() pokemonToRemove = new EventEmitter<string>();

    ngOnInit(): void {
        
    }

    removePokemonUrl() {
        this.pokemonToRemove.emit(this.pokemonUrl)
    }
}    