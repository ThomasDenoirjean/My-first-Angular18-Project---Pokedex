import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TeamSelectionComponent } from './teamselection/app.component.teamselection';
import { PokemonMovesBrower } from './movesbrowser/app.component.movesbrowser';
import { AppRoot } from './root/app.component.root';

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