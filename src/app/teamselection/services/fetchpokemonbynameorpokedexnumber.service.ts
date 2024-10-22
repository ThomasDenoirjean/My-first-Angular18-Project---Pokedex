import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../../pokemon.interface';

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonByNameOrPokedexNumberService {
    constructor(private http: HttpClient) { }

    getPokemonByNameorPokedexNumber(pokemonNameOrPokedexNumber: string | number): Observable<Pokemon> {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrPokedexNumber}/`;
        return this.http.get<any>(apiUrl).pipe(
            map(response => ({
                name: response.name,
                sprites: { official_front_default: response.sprites.other['official-artwork'].front_default }
            } as Pokemon))
        );
    }
}
