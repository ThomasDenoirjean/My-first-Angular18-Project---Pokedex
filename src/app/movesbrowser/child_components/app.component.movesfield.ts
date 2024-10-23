import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'moves-field',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
    <div>
        <select [(ngModel)]="selectedMove" (change)="onMoveChange()">
            <option value=""> Select a move </option>
            @for (move of availableMovesList; track move) {
                <ng-container *ngIf="selectedMovesList.indexOf(move) === -1">
                    <option [value]="move">{{ move }}</option>
                </ng-container>
                <ng-container *ngIf="move === selectedMove">
                    <option [value]="move" style="font-weight:bold;">{{ move }}</option>
                </ng-container>
            }
        </select>
    </div>
  `,
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