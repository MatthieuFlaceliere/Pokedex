import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { Result } from '../../../models/pokemon-result';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonResult: Result = {} as Result;
  pokemon: Pokemon = {} as Pokemon;
  loading = true;
  pokemonImageURL = 'assets/img/home/no-image.png ';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonDetails();
  }

  getPokemonDetails() {
    this.pokemonService.getPokemonDetails(this.pokemonResult.url).subscribe({
      next: (response: Pokemon) => {
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
