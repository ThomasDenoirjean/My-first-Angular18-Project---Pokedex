import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, forkJoin, catchError, of } from 'rxjs';
import { Pokemon } from '../../pokemon.interface';
import { FetchPokemonFrontDefaultSpriteService } from './fetchpokemonfrontdefaultsprite.service';

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
    constructor(
        private http: HttpClient,
        private fetchPokemonFrontDefaultSpriteService: FetchPokemonFrontDefaultSpriteService
    ) { }

    getPokemonsByGeneration(generation: number): Observable<Pokemon[]> {
        console.log('generation', generation);

        let apiUrl = `https://pokeapi.co/api/v2/generation/${generation}/`;

        return this.http.get<PokemonGenerationResponse>(apiUrl).pipe(
            mergeMap(response => {
                const pokemonObservables = response.pokemon_species.map(species => 
                    this.fetchPokemonFrontDefaultSpriteService.getPokemonFrontDefaultSprite(species.name).pipe(
                        map(spriteUrl => ({
                            name: species.name,
                            sprites: { official_front_default: spriteUrl }
                        } as Pokemon)),
                        catchError(error => {
                            console.log(`Error fetching sprite for ${species.name}`, error);
                            return of({
                                name: species.name,
                                sprites: { official_front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lucky-egg.png' }
                            } as Pokemon);
                        })  
                    )
                );

                return forkJoin(pokemonObservables);
            })
        );
    }
}