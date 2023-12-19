import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICriteria, OptRequest, Response } from 'ngrx-entity-crud';
import { Observable } from 'rxjs';

type RestCrudMethodPath =
  | 'create'
  | 'create-many'
  | 'search'
  | 'select'
  | 'update'
  | 'update-many'
  | 'delete'
  | 'delete-many';
type RestCrudMethodName =
  | 'create'
  | 'createMany'
  | 'search'
  | 'select'
  | 'update'
  | 'updateMany'
  | 'delete'
  | 'deleteMany';

type ParamsType = OptRequest | ICriteria;
type RestCrudMethods = {
  [key in RestCrudMethodName]: { path: RestCrudMethodPath };
};

@Injectable({
  providedIn: 'root',
})
export class BasePathMethodsCrudService<T> {
  service = '';
  id = 'id';
  debug = false;

  methodMap: RestCrudMethods = {
    create: { path: 'create' },
    createMany: { path: 'create-many' },
    search: { path: 'search' },
    select: { path: 'select' },
    update: { path: 'update' },
    updateMany: { path: 'update-many' },
    delete: { path: 'delete' },
    deleteMany: { path: 'delete-many' },
  };

  /**
   *
   * @protected
   */
  protected dtoKeys: string[];

  toDTO(dto: T, dtoKeys: string[]): T {
    return dtoKeys.reduce((prev, curr) => {
      prev[curr] = dto[curr];
      return prev;
    }, {} as T);
  }

  optDecorator(opt: OptRequest<T>): OptRequest<T> {
    if (!this.dtoKeys) {
      throw new Error();
    }
    const { mutationParams } = opt;
    let mutationParamsB: T = this.toDTO(mutationParams, this.dtoKeys);
    return { ...opt, mutationParams: mutationParamsB };
  }

  optDecoratorMany(opt: OptRequest<T[] | T | any>): OptRequest<T[]> {
    if (!this.dtoKeys) {
      throw new Error();
    }
    let mutationParams;
    if (opt.mutationParams.hasOwnProperty('data')) {
      const data = (opt.mutationParams as { data: T[] }).data.map((value) =>
        this.toDTO(value, this.dtoKeys)
      );
      mutationParams = { ...opt.mutationParams, data };
    } else {
      mutationParams = (opt.mutationParams as T[]).map((value) =>
        this.toDTO(value, this.dtoKeys)
      );
    }
    return { ...opt, mutationParams };
  }

  debugMode() {
    this.debug = true;
  }

  constructor(public http: HttpClient) {}

  httpOptions = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };

  post(
    opt: ParamsType,
    methodName: RestCrudMethodPath
  ): Observable<Response<T>> {
    if (typeof console !== 'undefined' && this.debug) {
      console.log('%c BasePathMethodsCrudService.post()', 'color: #777777');
      console.log(
        '%c Extended from: ' + this.constructor.name,
        'color: #777777'
      );
    }
    const path = !!opt && !!opt.path ? [methodName, ...opt.path] : [methodName];
    const body: any = !!(opt as OptRequest).mutationParams
      ? (opt as OptRequest).mutationParams
      : (opt as ICriteria).queryParams;
    return this.http.post<Response<T>>(
      `${this.getUrl(path, opt)}`,
      body,
      this.httpOptions()
    );
  }

  create(opt: OptRequest<T>): Observable<Response<T>> {
    const optB = this.optDecorator(opt);
    return this.post(optB, this.methodMap.create.path);
  }

  createMany(opt: OptRequest<T[] | T>): Observable<Response<T[]>> {
    const optB = this.optDecoratorMany(opt);
    return this.post(optB, this.methodMap.createMany.path);
  }

  search(opt?: ICriteria): Observable<Response<T[]>> {
    if (typeof console !== 'undefined' && this.debug) {
      console.log('BasePathMethodsCrudService.search()');
      console.log('Extended from: ' + this.constructor.name);
    }

    return this.post(opt, this.methodMap.search.path).pipe(
      map(this.searchMap.bind(this))
    );
  }

  searchMap = (res: Response<T[]>) => res;

  select(opt: ICriteria): Observable<Response<T>> {
    if (typeof console !== 'undefined' && this.debug) {
      console.log('%c BasePathMethodsCrudService.select()', 'color: #777777');
      console.log(
        '%c Extended from: ' + this.constructor.name,
        'color: #777777'
      );
    }
    return this.post(opt, this.methodMap.select.path);
  }

  update(opt: OptRequest<T>): Observable<Response<T>> {
    return this.post(opt, this.methodMap.update.path);
  }

  updateMany(opt: OptRequest<T[] | T>): Observable<Response<T[]>> {
    const optB = this.optDecoratorMany(opt);
    return this.post(optB, this.methodMap.updateMany.path);
  }

  delete(opt: OptRequest<T>): Observable<Response<string>> {
    const optB = this.optDecorator(opt);
    return this.post(optB, this.methodMap.delete.path);
  }

  deleteMany(opt: OptRequest<T[] | T>): Observable<Response<string[]>> {
    const optB = this.optDecoratorMany(opt);
    return this.post(optB, this.methodMap.deleteMany.path);
  }

  getId = (value: any) => value[this.id];

  getUrl(path?: string[], opt?: ParamsType): string {
    const servicePath = opt?.basePath ? opt?.basePath : this.service;
    const result = !!path ? `${servicePath}/${path.join('/')}` : servicePath;
    if (typeof console !== 'undefined' && this.debug) {
      console.log(
        '%c BasePathMethodsCrudService.getUrl(path?:string[]): string',
        'color: #777777'
      );
      console.log('%c path: ' + path, 'color: #777777');
      console.log(
        '%c Extended from: ' + this.constructor.name,
        'color: #777777'
      );
      console.log('%c result: ' + result, 'color: #777777');
    }
    return result;
  }
}
