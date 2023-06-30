import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonResult } from '../../models/pokemon-result';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonResult(limit: number, offset: number): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }
}
