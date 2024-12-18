import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import routeConfig from './routes';
import {provideProtractorTestingSupport} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideStore} from '@ngrx/store';
import {isReducer} from './state/favorite.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideHttpClient(), provideAnimations(), provideStore({favorite: isReducer})],
};
