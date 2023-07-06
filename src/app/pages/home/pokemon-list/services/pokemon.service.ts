import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonResult } from '../../models/pokemon-result';
import { Observable, map } from 'rxjs';
import { LightPokemon, Pokemon } from '../../models/pokemon';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des pokémons
   * @param limit Nombre de pokémons à récupérer
   * @param offset Index de départ
   * @returns Observable<PokemonResult>
   */
  getPokemonResult(limit: number, offset: number): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
  }

  /**
   * Récupère les détails d'un pokémon
   * @param url Url du pokémon
   * @returns Observable<Pokemon>
   */
  getPokemonDetails(url: string): Observable<LightPokemon> {
    const pokemon = this.getPokemonFromLocalStorage(this.getPokemonId(url));

    if (pokemon) {
      return new Observable(observer => {
        observer.next(pokemon);
        observer.complete();
      });
    } else {
      const pokemon$ = this.http.get<Pokemon>(url).pipe(
        map((pokemon: Pokemon) => {
          return this.parsePokemonToLightPokemon(pokemon);
        })
      );
      pokemon$.subscribe({
        next: (response: LightPokemon) => {
          this.setPokemonInLocalStorage(response);
        },
      });
      return pokemon$;
    }
  }

  /**
   * Récupère l'id du pokémon à partir de l'url
   * @param url Url du pokémon
   * @returns number
   */
  getPokemonId(url: string): number {
    return parseInt(url.split('/')[url.split('/').length - 2]);
  }

  /**
   * Récupère le détail d'un pokémon à partir de son id dans le localStorage
   * @param id Id du pokémon
   * @returns Pokemon
   */
  getPokemonFromLocalStorage(id: number): LightPokemon | undefined {
    const pokemon = localStorage.getItem(`pokemon-${id}`);
    if (pokemon) {
      return JSON.parse(pokemon) as LightPokemon;
    }
    return undefined;
  }

  /**
   * Enregistre le détail d'un pokémon dans le localStorage
   * @param pokemon LightPokemon
   * @returns void
   */
  setPokemonInLocalStorage(pokemon: LightPokemon): void {
    try {
      localStorage.setItem(`pokemon-${pokemon.id}`, JSON.stringify(pokemon));
    } catch (e) {
      console.error('Error saving to localStorage');
    }
  }

  /**
   * Parse pokemon to lightPokemon
   * @param pokemon Pokemon
   * @returns LightPokemon
   */
  parsePokemonToLightPokemon(pokemon: Pokemon): LightPokemon {
    const lightPokemon: LightPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      types: pokemon.types.map(type => type.type.name),
    };
    return lightPokemon;
  }
}
