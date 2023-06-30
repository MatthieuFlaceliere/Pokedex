import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon = {} as Pokemon;
  pokemonImageURL = 'assets/img/home/no-image.png ';

  ngOnInit() {
    if (this.pokemon.sprites.front_default !== null) {
      this.pokemonImageURL = this.pokemon.sprites.front_default;
    }
  }
}
