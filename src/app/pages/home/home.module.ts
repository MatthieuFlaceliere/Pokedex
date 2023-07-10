import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-list/components/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './pokemon-list/services/pokemon.service';
import { FirstLetterUppercasePipe } from './pokemon-list/pipes/first-letter-uppercase.pipe';
import { HighlightPipe } from './pokemon-list/pipes/highlight.pipe';
import { FormsModule } from '@angular/forms';
import { PokemonDetailsComponent } from './pokemon-list/components/pokemon-details/pokemon-details.component';
import { NumberFomartPipe } from './pokemon-list/pipes/number-fomart.pipe';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonCardComponent,
    FirstLetterUppercasePipe,
    HighlightPipe,
    PokemonDetailsComponent,
    NumberFomartPipe,
  ],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule, FormsModule],
  providers: [PokemonService],
})
export class HomeModule {}
