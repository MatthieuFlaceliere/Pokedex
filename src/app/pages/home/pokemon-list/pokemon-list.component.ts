import { Component, HostListener, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { PokemonResult, Result } from '../models/pokemon-result';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  filterActive = false;
  _searchText = '';
  loading = true;
  pokemonsCompleteList: Array<Result> = [];
  pokemonsFiltered: Array<Result> = [];

  pokemonsCurrentPage: Array<Result> = [];

  // Pagination
  pokemonsPerPage = 27;
  currentPage = 1;
  lastPage = 0;
  totalPokemons = 0;
  middlePages = [2, 3, 4];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
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
          // On récupère le numéro du pokémon à partir de l'url
          pokemon.number = parseInt(
            pokemon.url.split('/')[pokemon.url.split('/').length - 2]
          );
          this.pokemonsCompleteList.push(pokemon as Result);
        });
        this.pokemonsFiltered = this.pokemonsCompleteList;
      },
      complete: () => {
        this.loading = false;
        this.totalPokemons = this.pokemonsFiltered.length;
        this.initPagination();
      },
    });
  }

  //#region Pagination
  /**
   * Quand une page est changée
   * @param pokemons Liste des pokémons à afficher
   * @returns void
   */
  onPageChanged(newPage: number) {
    this.pokemonsCurrentPage = this.pokemonsFiltered.slice(
      (newPage - 1) * this.pokemonsPerPage,
      newPage * this.pokemonsPerPage
    );
    this.pagesUpdate(newPage);
  }

  /**
   * Initialise la pagination
   * @param nbResults Nombre de résultats
   */
  initPagination() {
    this.currentPage = 1;
    this.lastPage = Math.ceil(this.totalPokemons / this.pokemonsPerPage);
    this.onPageChanged(this.currentPage);
  }

  /**
   * Update les pages à afficher au milieu de la pagination
   * @param page Numéro de la page à afficher
   * @returns void
   */
  pagesUpdate(page: number) {
    // Si la page demandée est entre 3 et l'avant dernière page on set les trois pages du milieu à afficher
    if (page >= 4 && this.lastPage > 5) this.updatePagesArray(page);

    // Si la page 1 est demandée on set les pages à afficher à 2 et 3
    if (page === 1) {
      this.middlePages = [2, 3, 4];
    }

    // Si la dernière page est demandée on set les pages à afficher à l'avant dernière et à l'avant avant dernière
    if (page === this.lastPage && this.lastPage > 5) {
      this.middlePages = [this.lastPage - 2, this.lastPage - 1];
    }

    this.currentPage = page;
  }

  /**
   * Set l'array des pages à afficher au milieu de la pagination
   * @param page Page courante (numéro de la page qui va être affichée au milieu)
   */
  updatePagesArray(page: number) {
    this.middlePages = [page - 1, page, page + 1];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setPokemonsPerPage(event.target.innerWidth);
    this.initPagination();
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

  //#endregion Pagination

  // #region Filter
  /**
   * Filtrer les pokémons
   * @param filterValue Valeur du filtre
   * @returns void
   */
  filterPokemon(filterValue: string) {
    // Filtre les pokémons suivant le nom ou le numéro à partir de la list complète
    this.pokemonsFiltered = this.pokemonsCompleteList.filter(pokemon => {
      return (
        pokemon.name
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase()) ||
        pokemon.number?.toString().includes(filterValue)
      );
    });

    // On set les pokémons à afficher sur la première page
    this.pokemonsCurrentPage = this.pokemonsFiltered.slice(
      0,
      this.pokemonsPerPage
    );

    // On set le nombre de pokémons total et on initialise la pagination
    this.totalPokemons = this.pokemonsFiltered.length;
    this.initPagination();
  }

  set searchText(value: string) {
    console.log(value);
    this._searchText = value;
    this.filterPokemon(value);
  }

  get searchText(): string {
    return this._searchText;
  }

  //#endregion Filter
}
