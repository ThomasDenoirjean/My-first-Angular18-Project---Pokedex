import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, forkJoin } from 'rxjs';
import { Pokemon } from '../../pokemon.interface';
import { FetchPokemonFrontDefaultSpriteService } from './fetchpokemonfrontdefaultsprite.service';

export interface PokemonTypeResponse {
    pokemon: {
        pokemon: {
            name: string;
            url: string;
        };
        slot: number;
    }[];
}

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonsByTypeService {
    constructor(
        private http: HttpClient,
        private fetchPokemonFrontDefaultSpriteService: FetchPokemonFrontDefaultSpriteService
    ) { }

    getPokemonsByType(type: string): Observable<Pokemon[]> {
        let apiUrl = `https://pokeapi.co/api/v2/type/${type}/`;

        return this.http.get<PokemonTypeResponse>(apiUrl).pipe(
            mergeMap(response => {
                const pokemonObservables = response.pokemon.map(pokemonEntry =>
                    this.fetchPokemonFrontDefaultSpriteService.getPokemonFrontDefaultSprite(pokemonEntry.pokemon.name).pipe(
                        map(spriteUrl => ({
                            name: pokemonEntry.pokemon.name,
                            sprites: { front_default: spriteUrl }
                        } as Pokemon))
                    )
                );

                return forkJoin(pokemonObservables);
            })
        );
    }
}