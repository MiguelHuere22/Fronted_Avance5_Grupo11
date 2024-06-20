import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';  // Asegúrate de que esta ruta es correcta

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));


/*

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // Proveer HttpClient aquí
  ]
})
  .catch(err => console.error(err));

*/