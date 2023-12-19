import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as actions from './item.actions';
import {Item} from '@models/vo/item';
import {ItemService} from '@services/item.service';
import {
  createCall, createCatchError, createResponse,
  createManyCall, createManyCatchError, createManyResponse,
  deleteCall, deleteCatchError, deleteResponse,
  deleteManyCall, deleteManyCatchError, deleteManyResponse,
  editCall, editCatchError, editResponse,
  editManyCall, editManyCatchError, editManyResponse,
  searchCall, searchCatchError, searchResponse,
  selectCall, selectCatchError, selectResponse
} from 'ngrx-entity-crud';
import {repeat} from 'rxjs/operators';

@Injectable()
export class ItemStoreEffects {

  searchRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.SearchRequest),
    searchCall<Item>(this.service),
    searchResponse<Item>(actions, {dispatchResponse: false}),
    searchCatchError<Item>(actions),
    repeat()
  ));


  deleteRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteRequest),
    deleteCall<Item>(this.service),
    deleteResponse<Item>(actions, Item, {dispatchResponse: false}),
    deleteCatchError<Item>(actions),
    repeat()
  ));

  deleteManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteManyRequest),
    deleteManyCall<Item>(this.service),
    deleteManyResponse<Item>(actions, Item, {dispatchResponse: false}),
    deleteManyCatchError<Item>(actions),
    repeat()
  ));
  createRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateRequest),
    createCall<Item>(this.service),
    createResponse<Item>(actions, {dispatchResponse: false}),
    createCatchError<Item>(actions),
    repeat()
  ));

  createManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateManyRequest),
    createManyCall<Item>(this.service),
    createManyResponse<Item>(actions, {dispatchResponse: false}),
    createManyCatchError<Item>(actions),
    repeat()
  ));

  editRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.EditRequest),
    editCall<Item>(this.service),
    editResponse<Item>(actions, {dispatchResponse: false}),
    editCatchError<Item>(actions),
    repeat()
  ));

  editManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.EditManyRequest),
    editManyCall<Item>(this.service),
    editManyResponse<Item>(actions, {dispatchResponse: false}),
    editManyCatchError<Item>(actions),
    repeat()
  ));

  selectRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.SelectRequest),
    selectCall<Item>(this.service),
    selectResponse<Item>(actions, {dispatchResponse: false}),
    selectCatchError<Item>(actions),
    repeat()
  ));

  constructor(private readonly actions$: Actions, private readonly service: ItemService) {
  }

}
