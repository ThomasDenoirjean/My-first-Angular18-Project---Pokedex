import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon.interface';

@Injectable({
    providedIn: 'root'
})    
export class FetchRandomPokemonService {
    NUMBER_OF_POKEMON = 1025

    randomNumber = Math.floor(Math.random() * (this.NUMBER_OF_POKEMON + 1))

    private apiUrl = `https://pokeapi.co/api/v2/pokemon/${this.randomNumber}/`;

    constructor(private http: HttpClient) { }

    getRandomPokemon(): Observable<Pokemon> {
        return this.http.get<Pokemon>(this.apiUrl);
    }
}
