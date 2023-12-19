import { ofType } from '@ngrx/effects';
import {
  ICriteria,
  OptEffect,
  OptRequest,
  OptResponse,
  Response,
} from 'ngrx-entity-crud/lib/models';
import { from, MonoTypeOperatorFunction, pipe } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, repeat, switchMap } from 'rxjs/operators';
import { AcoActions, AcoMethod } from './aco.model';

export const mutationCall = <T>(
  method: AcoMethod<T>
): MonoTypeOperatorFunction<any> =>
  pipe(
    switchMap((payload) =>
      method(payload).pipe(
        map((response: Response<null>) => ({ response, payload } as any))
      )
    )
  );

export const mutationResponse = <T>(
  actions: AcoActions<T, ICriteria | OptRequest, OptResponse<any>>,
  optEffect?: OptEffect
): MonoTypeOperatorFunction<any> =>
  pipe(
    switchMap(({ response, payload }) => {
      const result: Action[] = [];
      if (response.hasError) {
        result.push(actions.Failure({ error: response.message }));
        if (payload.onFault) {
          result.push(...payload.onFault);
        }
      } else {
        result.push(actions.Success({ data: response.data, request: payload }));
        // result.push(actions.Filters({filters: {}}));
        if (payload.onResult) {
          const onResults = (payload.onResult as Action[]).map((a) =>
            (a as any).newAction ? (a as any).newAction(response, payload) : a
          );
          result.push(...onResults);
        }
      }

      if ((optEffect || {}).dispatchResponse || payload.dispatchResponse) {
        result.push(
          actions.Response({
            actionType: payload.type,
            request: payload,
            response,
          })
        );
      }

      return result;
    })
  );

export const mutationCatchError = <T>(
  actions: AcoActions<T, ICriteria | OptRequest, OptResponse<any>>
): MonoTypeOperatorFunction<any> =>
  pipe(
    catchError((error, caught) => {
      const response = [];
      response.push(actions.Failure({ error }));
      response.push(
        actions.Response({
          actionType: 'Failure',
          request: null,
          response: { hasError: true, message: error.message, data: null },
        })
      );
      return from(response);
    })
  );

export const createMutationEffect = <T>(
  actions: AcoActions<T, ICriteria | OptRequest, OptResponse<any>>,
  method: AcoMethod<T>,
  optEffect?: OptEffect
): MonoTypeOperatorFunction<Action> =>
  pipe(
    ofType(actions.Request),
    mutationCall(method),
    mutationResponse(actions, optEffect),
    mutationCatchError(actions),
    repeat()
  );
