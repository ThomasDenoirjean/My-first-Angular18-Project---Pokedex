import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon.interface';

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonByNameService {
    constructor(private http: HttpClient) { }

    getPokemonByName(pokemonName: string): Observable<Pokemon> {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
        return this.http.get<Pokemon>(apiUrl);
    }
}
