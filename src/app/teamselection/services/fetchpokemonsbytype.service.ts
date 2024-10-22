import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, forkJoin } from 'rxjs';
import { Pokemon } from '../../pokemon.interface';
import { FetchPokemonFrontDefaultSpriteService } from './fetchpokemonfrontdefaultsprite.service';

export interface PokemonTypeResponse {
        pokemon: {
            name: string;
            url: string;
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


        this.http.get<PokemonTypeResponse>(apiUrl).subscribe(
            (response) => {
              // Ici, 'response' contient les données récupérées depuis l'API
              const pokemonName = response.pokemon[0].name;
              console.log('pokemonName', pokemonName);
            },
            (error) => {
              // Gestion des erreurs éventuelles
              console.error('Erreur lors de la récupération des données :', error);
            }
        );

        return this.http.get<PokemonTypeResponse>(apiUrl).pipe(
            mergeMap(response => {
                // console.log('response in fetchpokemonbytype', response.pokemon) //.pokemonSlot[0].pokemon.name

                const pokemonObservables = response.pokemon.map(pokemon =>
                    this.fetchPokemonFrontDefaultSpriteService.getPokemonFrontDefaultSprite(pokemon.name).pipe(
                        map(spriteUrl => ({
                            name: pokemon.name,
                            sprites: { front_default: spriteUrl }
                        } as Pokemon))
                    )
                );

                return forkJoin(pokemonObservables);
            })
        );
    }
}