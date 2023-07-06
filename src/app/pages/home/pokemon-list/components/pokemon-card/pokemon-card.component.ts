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
  loadingImage = true;
  defaultImage: string;
  pokemonImageUrl: string;

  constructor(private pokemonService: PokemonService) {
    this.defaultImage = this.pokemonImageUrl = 'assets/img/home/no-image.png';
  }

  ngOnInit() {
    this.getPokemonDetails();
  }

  getPokemonDetails() {
    this.pokemonService.getPokemonDetails(this.pokemonResult.url).subscribe({
      next: (response: LightPokemon) => {
        this.pokemon = response;
        if (this.pokemon.image !== null) {
          this.pokemonImageUrl = this.pokemon.image;
        }
        this.pokemon.types = this.pokemon.types.map(type => {
          return 'assets/img/pokemon-types/' + type + '.png';
        });
        console.log(this.pokemon);
      },
    });
  }

  imageLoad() {
    this.loadingImage = false;
  }
}
