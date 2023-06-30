import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { PokemonResult } from '../models/pokemon-result';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  filterActive = false;
  loading = true;
  pokemons: Array<Pokemon> = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonResult();
  }

  getPokemonResult() {
    this.pokemonService
      .getPokemonResult(12, 0)
      .subscribe((response: PokemonResult) => {
        this.getPokemonDetails(response);
      });
  }

  getPokemonDetails(pokemonResult: PokemonResult) {
    pokemonResult.results.forEach(pokemon => {
      this.pokemonService.getPokemonDetails(pokemon.url).subscribe({
        next: (response: Pokemon) => {
          this.pokemons.push(response);
        },
        complete: () => {
          this.loading = false;
        },
      });
    });
  }
}
