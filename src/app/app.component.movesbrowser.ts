import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
    selector: 'moves-browser',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.movesbrowser.html',
    styleUrl: './app.component.css'
})
export class PokemonMovesBrower {
    
}  