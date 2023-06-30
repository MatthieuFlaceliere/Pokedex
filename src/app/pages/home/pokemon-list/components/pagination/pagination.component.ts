import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 0;
  @Output() pageChangedEvent = new EventEmitter<IPagination>();
  pagination: IPagination = {
    itemsPerPage: 27,
    currentPage: 1,
    lastPage: 0,
    totalItems: 0,
    middlePages: [2, 3],
  };

  ngOnInit(): void {
    this.initPagination();
  }

  /**
   * Initialise la pagination
   * @param nbResults Nombre de résultats
   */
  initPagination() {
    this.pagination.itemsPerPage = this.itemsPerPage;
    this.pagination.totalItems = this.totalItems;
    this.pagination.lastPage = Math.ceil(
      this.pagination.totalItems / this.pagination.itemsPerPage
    );
    this.pageChanged(this.pagination.currentPage);
  }

  /**
   * Change la page courante
   * @param page Numéro de la page à afficher
   * @returns void
   */
  pageChanged(page: number) {
    // Si la page demandée est entre 3 et l'avant dernière page on set les trois pages du milieu à afficher
    if (page >= 3 && page <= this.pagination.lastPage - 2)
      this.setMiddlePages(page);

    // Si la page 1 est demandée on set les pages à afficher à 2 et 3
    if (page === 1) {
      this.pagination.middlePages = [2, 3];
    }

    // Si la dernière page est demandée on set les pages à afficher à l'avant dernière et à l'avant avant dernière
    if (page === this.pagination.lastPage) {
      this.pagination.middlePages = [
        this.pagination.lastPage - 2,
        this.pagination.lastPage - 1,
      ];
    }

    this.pagination.currentPage = page;
    this.pageChangedEvent.emit(this.pagination);
  }

  /**
   * Set les pages à afficher au milieu de la pagination
   * @param page Page courante (numéro de la page qui va être affichée au milieu)
   */
  setMiddlePages(page: number) {
    // Si on va vers la droite ou vers la gauche
    if (page > this.pagination.currentPage) {
      // Si on a déjà 3 pages au milieu on supprime la première
      if (this.pagination.middlePages.length >= 3) {
        this.pagination.middlePages.shift();
      }
      // On ajoute la page suivante
      this.pagination.middlePages.push(page + 1);
    } else {
      // Si on a déjà 3 pages au milieu on supprime la dernière
      if (this.pagination.middlePages.length >= 3) {
        this.pagination.middlePages.pop();
      }
      // On ajoute la page précédente
      this.pagination.middlePages.unshift(page - 1);
    }
  }
}

export interface IPagination {
  itemsPerPage: number;
  currentPage: number;
  lastPage: number;
  totalItems: number;
  middlePages: Array<number>;
}
