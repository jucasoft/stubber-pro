import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {
  mutationCall,
  mutationCatchError,
  mutationResponse,
} from '@core/async-crud-operation/aco.effect';
import { dump } from '@root-store/dump-file-store/dump-file.actions';
import { DumpFileService } from '@services/dump-file.service';
import { repeat } from 'rxjs/operators';

@Injectable()
export class DumpFileEffects {
  uploadRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(dump.Request),
      tap((value) => console.log('value: ', value)),
      mutationCall(this.dumpFileService.dump),
      mutationResponse(dump),
      mutationCatchError(dump),
      repeat()
    )
  );

  constructor(
    private dumpFileService: DumpFileService,
    private actions$: Actions,
    private store$: Store
  ) {
    console.log('DumpFileEffects.constructor()');
  }
}
