import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LightPokemon } from '../../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  @Input() pokemon: LightPokemon = {} as LightPokemon;
  @Output() closeDetailsEvent = new EventEmitter<void>();
  loadingImage = true;
  defaultImage: string;
  pokemonImageUrl: string;

  constructor(private pokemonService: PokemonService) {
    this.defaultImage = this.pokemonImageUrl = 'assets/img/home/no-image.png';
  }

  ngOnInit() {
    if (this.pokemon.image !== null) {
      this.pokemonImageUrl = this.pokemon.image;
    }
  }

  closeDetails() {
    this.closeDetailsEvent.emit();
  }

  imageLoad() {
    this.loadingImage = false;
  }

  /**
   * Chnage l'état de capture du pokémon
   */
  toogleCatch() {
    this.pokemon.catched = this.pokemon.catched ? false : true;
    this.pokemonService.toogleCatch(this.pokemon);
  }
}
