import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from "../../pokemon.interface";
import { MovesField } from "./app.component.movesfield";
import { FetchPokemonMovesService } from "../services/fetchpokemonmoves.service";

@Component({
    selector: 'moves-pokemon-card',
    standalone: true,
    imports: [MovesField],
    templateUrl: './app.component.movespokemoncard.html',
    styleUrl: './app.component.movespokemoncard.css'
})
export class MovesPokemonCard implements OnInit {
    @Input() pokemon!: Pokemon;

    availableMovesList!: string[]
    selectedMovesList: string[] = ['', '', '', ''];

    constructor(
        private fetchPokemonMovesService: FetchPokemonMovesService
    ) {}

    ngOnInit(): void {
        this.fetchPokemonMovesService.getPokemonMoves(this.pokemon.name).subscribe((response) => {
            this.availableMovesList = response
        })
    }

    onMoveSelected(moveAndIndex: {move: string, index: number}) {
        this.selectedMovesList[moveAndIndex.index] = moveAndIndex.move
    }
}  