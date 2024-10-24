import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from "../../pokemon.interface";
import { MovesField } from "./app.component.movesfield";
import { FetchPokemonMovesService } from "../services/fetchpokemonmoves.service";
import { PokemonMovesStorageService } from "../services/pokemonmovesstorage.service";

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
        private fetchPokemonMovesService: FetchPokemonMovesService,
        private pokemonMovesStorageService: PokemonMovesStorageService
    ) {}

    ngOnInit(): void {
        this.fetchPokemonMovesService.getPokemonMoves(this.pokemon.name).subscribe((response) => {
            this.availableMovesList = response
        })

        this.selectedMovesList = this.pokemonMovesStorageService.getSelectedMoves(this.pokemon.name);

        console.log('this.selectedMovesList OnInit Bloc', this.selectedMovesList)
    }

    onMoveSelected(moveAndIndex: {move: string, index: number}) {
        this.selectedMovesList[moveAndIndex.index] = moveAndIndex.move

        this.pokemonMovesStorageService.updateSelectedMoves(this.pokemon.name, this.selectedMovesList);
    }
}  