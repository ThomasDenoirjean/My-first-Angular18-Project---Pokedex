import { Component, Input, OnInit } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { Pokemon } from "../pokemon.interface";
import { MovesPokemonCard } from "./child_components/app.component.movespokemoncard";
import { TeamService } from "../teamupdate.service";

@Component({
    selector: 'moves-browser',
    standalone: true,
    imports: [RouterOutlet, RouterLink, MovesPokemonCard],
    templateUrl: './app.component.movesbrowser.html',
})
export class PokemonMovesBrower implements OnInit {
    pokemonTeam!: Pokemon[]

    constructor(private teamService: TeamService) {}

    ngOnInit(): void {
        this.teamService.pokemonTeam$.subscribe((team: Pokemon[]) => {
          this.pokemonTeam = team;
          console.log('Updated Pokemon team:', this.pokemonTeam);
        });
    }
}  