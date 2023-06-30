import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { PokemonResult, Result } from '../models/pokemon-result';
import { IPagination } from './components/pagination/pagination.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  filterActive = false;
  loading = true;
  pokemons: Array<Result> = [];
  pokemonsToDisplay: Array<Result> = [];
  pokemonsPerPage = 27;

  constructor(
    private pokemonService: PokemonService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.getPokemonResult(10000, 0);
    this.setPokemonsPerPage(window.innerWidth);
  }

  /**
   * Récupère les résultats des pokémons
   * @param limit Nombre de résultats à récupérer
   * @param offset Nombre de résultats à sauter
   * @returns void
   */
  getPokemonResult(limit: number, offset: number) {
    this.loading = true;

    this.pokemonService.getPokemonResult(limit, offset).subscribe({
      next: (response: PokemonResult) => {
        response.results.forEach(pokemon => {
          this.pokemons.push(pokemon as Result);
        });
      },
      complete: () => {
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  /**
   * Quand une page est changée
   * @param pokemons Liste des pokémons à afficher
   * @returns void
   */
  pageChanged(pagination: IPagination) {
    this.pokemonsToDisplay = this.pokemons.slice(
      (pagination.currentPage - 1) * pagination.itemsPerPage,
      pagination.currentPage * pagination.itemsPerPage
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setPokemonsPerPage(event.target.innerWidth);
  }

  /**
   * Set le nombre de résultats par page suivant la taille de l'écran
   * @param windowWidth Largeur de l'écran
   * @returns void
   */
  setPokemonsPerPage(windowWidth: number) {
    if (windowWidth > 1200) {
      this.pokemonsPerPage = 27;
    } else if (windowWidth < 1200 && windowWidth > 992) {
      this.pokemonsPerPage = 24;
    } else if (windowWidth < 992 && windowWidth > 768) {
      this.pokemonsPerPage = 18;
    } else if (windowWidth < 768 && windowWidth > 376) {
      this.pokemonsPerPage = 12;
    } else {
      this.pokemonsPerPage = 9;
    }
  }
}
