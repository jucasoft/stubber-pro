import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from "@ngrx/store";
import {ItemStoreActions, ItemStoreSelectors} from "@root-store/item-store/index";
import {Observable} from "rxjs";
import {Item} from "@models/vo/item";
import {dump} from "@root-store/dump-file-store/dump-file.actions";
import {DumpFileActions} from "@root-store/dump-file-store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private readonly store$:Store) {}

  versions = [
    { name: 'master', code: 'master' },
    { name: '1.0.0', code: '1.0.0' },
    { name: '2.0.0', code: '2.0.0' },
    { name: '3.1.0', code: '3.1.0' },
    { name: '4.3.1', code: '4.3.1' },
  ];

  items$: Observable<any[]>;
  statesList = [
    { name: '200', code: '200' },
    { name: '3xx', code: '3xx' },
    { name: '4xx', code: '4xx' },
    { name: '5xx', code: '5xx' },
  ];

  ngOnInit(): void {
    this.items$ = this.store$.select(ItemStoreSelectors.selectAll)
    this.reset();
  }

  prev() {}

  reset() {
    this.store$.dispatch(ItemStoreActions.SearchRequest({mode:"REFRESH", queryParams:{}}))
    // this.http
    //   .post<any[]>('api/v1/item/search', { id: 0 })
    //   .subscribe((items: any[]) => (this.items = items));
  }

  delete(item: any) {
    this.store$.dispatch(ItemStoreActions.DeleteRequest({mutationParams:item}))

    // this.http
    //   .post<any[]>('api/v1/item/delete', item)
    //   .subscribe();

    // this.http
    //   .post<any[]>('api/v1/item/delete', item)
    //   .subscribe((items: any[]) => (this.items = items));
  }

  dump() {
    this.store$.dispatch(DumpFileActions.dump.Request({mutationParams:{}}))

    // this.http
    //   .post<any[]>('api/v1/utils/dump', {})
    //   .subscribe((items: any[]) => (console.log("items: ", items)));
  }

  restore() {
    // this.http
    //   .post<any[]>('api/v1/utils/restore', {})
    //   .subscribe((items: any[]) => {
    //     (this.items = items)
    //   });
  }

  add() {
    // this.http
    //   .post<any[]>('api/v1/add', {})
    //   .subscribe((items: any[]) => (this.items = items));
  }

  onActiveChange(item: Item) {
    const mutationParams = {...item, active:!item.active}
    this.store$.dispatch(ItemStoreActions.EditRequest({mutationParams}))

    // this.http
    //   .post<any[]>('api/v1/item/update', { ...item, active: !item.active })
    //   .subscribe((items: any[]) => (this.items = items));
  }

  deleteAll(items:any[]) {
    items.forEach((item)=>this.delete(item))
  }
}
