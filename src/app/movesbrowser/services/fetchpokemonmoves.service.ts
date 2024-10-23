import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonMovesService {
    constructor(private http: HttpClient) { }

    getPokemonMoves(pokemonName: string): Observable<string[]> {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
        return this.http.get<any>(apiUrl).pipe(
            map(response => {
                return response.moves.map((moveEntry: any) => moveEntry.move.name)
            })
        );
    }
}