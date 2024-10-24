import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonMovesStorageService {
  private movesStorage: { [pokemonName: string]: string[] } = {};

  getSelectedMoves(pokemonName: string): string[] {
    console.log('this.movesStorage[pokemonName]', this.movesStorage[pokemonName])
    return this.movesStorage[pokemonName] || ['', '', '', ''];
  }

  updateSelectedMoves(pokemonName: string, selectedMoves: string[]) {
    this.movesStorage[pokemonName] = [...selectedMoves];
    console.log('this.movesStorage[pokemonName]', this.movesStorage[pokemonName])
  }

  //// FIXME ça ne fonctionne pas
}