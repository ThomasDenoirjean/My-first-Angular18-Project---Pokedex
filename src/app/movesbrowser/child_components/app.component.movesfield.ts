import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'moves-field',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './app.component.movesfield.html',
    styleUrl: './app.component.movesfield.css'
})
export class MovesField implements OnInit {
    @Input() availableMovesList!: string[];
    @Input() selectedMovesList!: string[];
    @Input() moveIndex!: number;

    @Output() moveSelected = new EventEmitter<{move: string, index: number}>();

    selectedMove!: string;

    ngOnInit(): void {
        if (this.selectedMovesList[this.moveIndex]) {
            this.selectedMove = this.selectedMovesList[this.moveIndex]
        } else {
            this.selectedMove = ''
        }
    }

    //// FIXME c'est ici que ce trouve le bug, ça reprend la valuer '' par défaut

    onMoveChange() {
        this.moveSelected.emit({move: this.selectedMove, index: this.moveIndex});
    }
}  