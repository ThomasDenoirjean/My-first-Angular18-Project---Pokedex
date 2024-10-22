import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.root.html',
})
export class AppRoot {
}  