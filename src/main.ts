import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TeamSelectionComponent } from './app/app.component.teamselection';

bootstrapApplication(TeamSelectionComponent, appConfig)
  .catch((err) => console.error(err));
