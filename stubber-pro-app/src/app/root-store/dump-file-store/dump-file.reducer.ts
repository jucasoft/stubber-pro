import {
  initialState
} from './dump-file.state';
import {
  dump
} from './dump-file.actions';
import { createReducer, on } from '@ngrx/store';

export const featureReducer = createReducer(
  initialState,
  on(dump.Request, (state, action) => ({
    ...state,
    isLoading:true,
    isLoaded:false
  })),
  on(dump.Success, (state, action) => ({
    ...state,
    isLoading:true,
    isLoaded:true
  })),
  on(dump.Failure, (state, action) => ({
    ...state,
    isLoading:false,
    isLoaded:false
  }))
);
