import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from "../../pokemon.interface";
import { MovesField } from "./app.component.movesfield";
import { FetchPokemonMovesService } from "../services/fetchpokemonmoves.service";

@Component({
    selector: 'moves-pokemon-card',
    standalone: true,
    imports: [MovesField],
    template: `
    <div>
        @if (pokemon) {
        <img [src]="pokemon.sprites.official_front_default" alt="Photo de pokemon" height="100">
        }
        <div>
            @for (slot of selectedMovesList; track $index) {
                <moves-field [availableMovesList]="availableMovesList" [moveIndex]="$index"
                [selectedMovesList]="selectedMovesList" (moveSelected)="onMoveSelected($event)"> </moves-field>
            }
        </div>
    </div>
    `,
})
export class MovesPokemonCard implements OnInit {
    @Input() pokemon!: Pokemon;

    availableMovesList!: string[]
    selectedMovesList: string[] = ['', '', '', '']; /// utiliser pour créer les slots, trouver un autre moyen de le faire ?

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