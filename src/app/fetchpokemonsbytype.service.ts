import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from './pokemon.interface';

export interface PokemonTypeResponse {
    pokemon: {
        pokemon: Pokemon;
        slot: number;
    }[];
}

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonsByTypeService {
    constructor(private http: HttpClient) { }

    getPokemonsByType(type: string): Observable<Pokemon[]> {
        let apiUrl = `https://pokeapi.co/api/v2/type/${type}/`;

        return this.http.get<PokemonTypeResponse>(apiUrl).pipe(
            map(response => response.pokemon.map(p => p.pokemon))
        );
    }
}