import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {  provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';

export const appConfig: ApplicationConfig = {

  providers: [  provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
     provideClientHydration(), provideHttpClient(), provideToastr(),provideAnimations(), QRCodeModule, QRCodeComponent,  ]
};
