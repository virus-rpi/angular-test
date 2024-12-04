import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import routeConfig from './routes';
import {provideProtractorTestingSupport} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideHttpClient()],
};
