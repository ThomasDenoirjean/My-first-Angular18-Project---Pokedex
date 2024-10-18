import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { TeamSelectionComponent } from './app.component.teamselection';

@NgModule({
  declarations: [
    TeamSelectionComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [TeamSelectionComponent]
})
export class AppModule { }