import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../../pokemon.interface';

@Injectable({
    providedIn: 'root'
})    
export class FetchPokemonByRandomService {
    NUMBER_OF_POKEMON = 1025

    constructor(private http: HttpClient) { }

    getPokemonByRandom(): Observable<Pokemon> {
        let randomNumber = Math.floor(Math.random() * (this.NUMBER_OF_POKEMON + 1))
        let apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`;
        return this.http.get<Pokemon>(apiUrl);
    }
}