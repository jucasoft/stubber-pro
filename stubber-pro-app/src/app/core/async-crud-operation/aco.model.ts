import {OptRequest, Response, TypedAction} from "ngrx-entity-crud";
import {Observable} from 'rxjs';
import {ActionCreator} from '@ngrx/store';

/**
 * REQUEST ICriteria || OptRequest
 */
export type AcoMethod<T> = <T>(opt: OptRequest<T>) => Observable<Response<T>>

export interface AcoActions<T, REQUEST, RESPONSE> {

  Request: ActionCreator<string, (props: REQUEST) => REQUEST & TypedAction<string>>;

  Failure: ActionCreator<string, (props: {
    error: string;
  }) => {
    error: string;
  } & TypedAction<string>>;

  Success: ActionCreator<string, (props: {
    data: T;
    request: REQUEST;
  }) => {
    data: T;
    request: REQUEST;
  } & TypedAction<string>>;

  Response: ActionCreator<string, (props: RESPONSE) => RESPONSE & TypedAction<string>>;


}
