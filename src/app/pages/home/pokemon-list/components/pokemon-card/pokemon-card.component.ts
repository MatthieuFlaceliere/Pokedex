import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { LightPokemon } from '../../../interfaces/pokemon';
import { Result } from '../../../interfaces/pokemon-result';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonResult: Result = {} as Result;
  @Input() searchText = '';
  @Output() cardClickEvent = new EventEmitter<LightPokemon>();
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
        this.pokemon.catched = this.pokemonResult.catched;
        if (this.pokemon.image !== null) {
          this.pokemonImageUrl = this.pokemon.image;
        }
      },
    });
  }

  imageLoad() {
    this.loadingImage = false;
  }

  @HostListener('click', ['$event'])
  onClick() {
    if (JSON.stringify(this.pokemon) !== JSON.stringify({} as LightPokemon)) {
      this.cardClickEvent.emit(this.pokemon);
    }
  }
}
