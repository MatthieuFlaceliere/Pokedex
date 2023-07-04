import { Component, Input, OnInit } from '@angular/core';
import { LightPokemon, Pokemon } from '../../../models/pokemon';
import { Result } from '../../../models/pokemon-result';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonResult: Result = {} as Result;
  @Input() searchText = '';
  pokemon: LightPokemon = {} as LightPokemon;
  loading = true;
  pokemonImageURL = 'assets/img/home/no-image.png ';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonDetails();
  }

  getPokemonDetails() {
    this.pokemonService.getPokemonDetails(this.pokemonResult.url).subscribe({
      next: (response: LightPokemon) => {
        this.pokemon = response;
        if (this.pokemon.sprites.front_default !== null) {
          this.pokemonImageURL = this.pokemon.sprites.front_default;
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
