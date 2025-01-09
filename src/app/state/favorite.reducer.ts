import {createReducer, on} from '@ngrx/store';
import {addFavorite, removeFavorite} from './favorite.actions';

export const initialState: number[] = [];

const favoriteReducer = createReducer(
  initialState,
  on(addFavorite, (state, {favorite}) => [...state, favorite]),
  on(removeFavorite, (state, {favorite}) => state.filter(f => f !== favorite))
);

export { favoriteReducer };
