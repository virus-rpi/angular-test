import {createAction, props} from '@ngrx/store';

export const addFavorite = createAction(
  '[Favorite] Add Favorite',
  props<{ favorite: number }>()
);

export const removeFavorite = createAction(
  '[Favorite] Remove Favorite',
  props<{ favorite: number }>()
);
