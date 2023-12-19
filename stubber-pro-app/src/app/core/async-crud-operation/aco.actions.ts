import {ActionEnum, CrudEnum, OptRequest, OptResponse} from "ngrx-entity-crud";
import {createAction, props} from '@ngrx/store';
import {AcoActions} from "@core/async-crud-operation/aco-model";

export function createAcoActions<T>(name: string, actionName:string, suffix: string): AcoActions<T, OptRequest<T>, OptResponse<T>> {

  const _suffix = suffix ? suffix + ' ' : ''
  const Response = createAction(`[${name}] ${suffix}${ActionEnum.RESPONSE}`, props<OptResponse<T>>());
  const Request = createAction(`[${name}] ${suffix}${actionName} ${ActionEnum.REQUEST}`, props<OptRequest<T>>());
  const Failure = createAction(`[${name}] ${suffix}${actionName} ${ActionEnum.FAILURE}`, props<{ error: string }>());
  const Success = createAction(`[${name}] ${suffix}${actionName} ${ActionEnum.SUCCESS}`, props<{
    data: T,
    request: OptRequest<T>
  }>());

  return {
    Response,
    Request,
    Failure,
    Success
  };

}

