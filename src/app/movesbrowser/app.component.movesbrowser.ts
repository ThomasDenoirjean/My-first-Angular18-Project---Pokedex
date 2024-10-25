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
    styleUrl: './app.component.movesbrowser.css',
})
export class PokemonMovesBrower implements OnInit {
    pokemonTeam!: Pokemon[]

    constructor(private teamService: TeamService) {}

    ngOnInit(): void {
        this.teamService.pokemonTeam$.subscribe((team: Pokemon[]) => {
          this.pokemonTeam = team;
        });
    }
}  