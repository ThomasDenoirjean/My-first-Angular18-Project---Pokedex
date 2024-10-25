import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../teamupdate.service';
import { PokemonCard } from './child_components/app.components.pokemoncard';
import { PokemonList } from './child_components/app.components.pokemonlist';
import { TeamPokemonCard } from './child_components/app.component.teampokemoncard';
import { Pokemon } from '../pokemon.interface';

@Component({
    selector: 'team-selection',
    standalone: true,
    imports: [RouterOutlet, RouterLink, PokemonCard, PokemonList, TeamPokemonCard, FormsModule, CommonModule],
    templateUrl: './app.component.teamselection.html',
    styleUrl: './app.component.teamselection.css'
})
export class TeamSelectionComponent implements OnInit {
    @Output() pokemonClicked = new EventEmitter<Pokemon>();

    pokemonsToDisplay: Pokemon[] = []
    type = '';
    generation!: number;
    getPokemonByRandom: boolean = false;
    nameOrPokedexNumber: string | number = '';
    displayMode: string = '';
    lastAppIdGiven: number = 1;

    private NUMBER_OF_POKEMON_TO_DISPLAY: number = 6;

    constructor(private teamService: TeamService) { }

    ngOnInit(): void {
        this.teamService.pokemonTeam$.subscribe((team: Pokemon[]) => {
            this.pokemonsToDisplay = team;
        });
    }

    changeGetPokemonByRandomValue() {
        this.getPokemonByRandom = !this.getPokemonByRandom
    }

    onPokemonClicked(pokemon: Pokemon) {
        if (this.pokemonsToDisplay.length <= this.NUMBER_OF_POKEMON_TO_DISPLAY - 1) {
            const clonedPokemon = { ...pokemon };
            clonedPokemon.appId = this.lastAppIdGiven;
            this.lastAppIdGiven += 1;
            this.pokemonsToDisplay.push(clonedPokemon)
            this.teamService.updateTeam(this.pokemonsToDisplay);
        }
    }

    onPokemonToRemove(pokemon: Pokemon) {
        this.pokemonsToDisplay.splice(this.pokemonsToDisplay.indexOf(pokemon), 1)
        this.teamService.updateTeam(this.pokemonsToDisplay);
    }
}
