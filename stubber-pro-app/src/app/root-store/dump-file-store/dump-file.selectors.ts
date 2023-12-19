import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  State,
} from './dump-file.state';
import {Names} from "./dump-file.names";

const getIsLoading = (state: State): boolean => state.isLoading;
const getIsLoaded = (state: State): boolean => state.isLoaded;

export const selectFeatureState: MemoizedSelector<object, State> =
  createFeatureSelector<State>(Names.NAME);

export const selectIsLoading: MemoizedSelector<object, boolean> =
  createSelector(selectFeatureState, getIsLoading);

export const selectIsLoaded: MemoizedSelector<object, boolean> =
  createSelector(selectFeatureState, getIsLoaded);
