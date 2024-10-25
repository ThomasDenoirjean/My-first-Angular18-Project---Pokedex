import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonMovesStorageService {
  private movesStorage: { [pokemonAppId: number]: string[] } = {};

  getSelectedMoves(pokemonAppId: number): string[] {
    return this.movesStorage[pokemonAppId] || ['', '', '', ''];
  }

  updateSelectedMoves(pokemonAppId: number, selectedMoves: string[]) {
    this.movesStorage[pokemonAppId] = [...selectedMoves];
  }
}