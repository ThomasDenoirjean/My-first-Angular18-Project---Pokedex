import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from './pokemon.interface';

export interface PokemonGenerationResponse {
    pokemon_species: {
        name: string;
        url: string;
    }[];
}

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonsByGenerationService {
    constructor(private http: HttpClient) { }

    getPokemonsByGeneration(generation: number): Observable<Pokemon[]> {
        console.log('generation', generation);

        let apiUrl = `https://pokeapi.co/api/v2/generation/${generation}/`;

        return this.http.get<PokemonGenerationResponse>(apiUrl).pipe(
            map(response => response.pokemon_species.map(species => {
                return {
                    name: species.name,
                    // sprites: { front_default: '' }
                } as Pokemon;
            }))
        );
    }
}