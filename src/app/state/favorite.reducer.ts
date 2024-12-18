import {createReducer, on} from '@ngrx/store';
import {addFavorite, removeFavorite} from './favorite.actions';

export const initialState: number[] = [];

const _favoriteReducer = createReducer(
  initialState,
  on(addFavorite, (state, {favorite}) => [...state, favorite]),
  on(removeFavorite, (state, {favorite}) => state.filter(f => f !== favorite))
);

export function isReducer(state: any, action: any) {
  return _favoriteReducer(state, action);
}
