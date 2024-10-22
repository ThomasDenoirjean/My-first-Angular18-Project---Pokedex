import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppRoot } from './app/root/app.component.root';

bootstrapApplication(AppRoot, appConfig)
  .catch((err) => console.error(err));
