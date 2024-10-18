import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { TeamSelectionComponent } from './app.component.teamselection';
import { PokemonMovesBrower } from './app.component.movesbrowser';
import { AppRoot } from './app.component.root';

import { routes } from './app.routes'

@NgModule({
  declarations: [
    AppRoot,
    TeamSelectionComponent,
    PokemonMovesBrower
  ],
  imports: [
    BrowserModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppRoot]
})
export class AppModule { }