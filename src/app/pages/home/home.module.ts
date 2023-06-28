import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-list/components/pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [PokemonListComponent, PokemonCardComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
