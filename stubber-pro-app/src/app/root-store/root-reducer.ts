import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {State} from '@root-store/state';
import {environment} from '../../environments/environment';

export const reducers: ActionReducerMap<State> = {
  item:null
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
