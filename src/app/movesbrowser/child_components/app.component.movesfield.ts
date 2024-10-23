import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'moves-field',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './app.component.movesfield.html',
    styleUrl: './app.component.movesfield.css'
})
export class MovesField {
    @Input() availableMovesList!: string[];
    @Input() selectedMovesList!: string[];
    @Input() moveIndex!: number;

    @Output() moveSelected = new EventEmitter<{move: string, index: number}>();

    selectedMove: string ='';

    onMoveChange() {
        this.moveSelected.emit({move: this.selectedMove, index: this.moveIndex});
    }
}  