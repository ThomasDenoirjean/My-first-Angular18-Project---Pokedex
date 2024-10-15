import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from './pokemon.interface';

export interface PokemonTypeResponse {
    pokemon: {
        pokemon: Pokemon;
        slot: number; // Position dans le type
    }[];
}

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonByTypeService {
    private apiUrl = 'https://pokeapi.co/api/v2/type/ground/';

    constructor(private http: HttpClient) { }

    getPokemonsByType(): Observable<Pokemon[]> {
        return this.http.get<PokemonTypeResponse>(this.apiUrl).pipe(
            map(response => response.pokemon.map(p => p.pokemon))
        );
    }
}