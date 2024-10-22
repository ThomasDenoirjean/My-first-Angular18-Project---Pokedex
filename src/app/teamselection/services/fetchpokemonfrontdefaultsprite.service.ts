import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonFrontDefaultSpriteService {
    constructor(private http: HttpClient) { }

    getPokemonFrontDefaultSprite(pokemonName: string): Observable<string> {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

        return this.http.get<any>(apiUrl).pipe(
            map(response => response.sprites.front_default)
        );
    }
}