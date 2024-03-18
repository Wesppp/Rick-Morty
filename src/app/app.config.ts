import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { BASE_URL } from '@constants/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: BASE_URL, useValue: 'https://rickandmortyapi.com/api'},
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ],
};
