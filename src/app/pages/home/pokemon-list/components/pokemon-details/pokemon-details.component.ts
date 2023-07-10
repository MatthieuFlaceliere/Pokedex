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
  @Output() togleCatchEvent = new EventEmitter<LightPokemon>();
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
    // Si le ype du pokemon est déja le path de l'image, on ne fait rien
    this.pokemon.types = this.pokemon.types.map(type => {
      if (type.includes('.png')) return type;
      else return 'assets/img/pokemon-types/' + type + '.png';
    });
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
  togleCatch() {
    this.pokemon.catched = this.pokemon.catched ? false : true;
    this.togleCatchEvent.emit(this.pokemon);
    this.pokemonService.togleCatch(this.pokemon);
  }
}
