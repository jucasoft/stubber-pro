import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OptRequest} from "ngrx-entity-crud";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DumpFileService {
  constructor(public http: HttpClient) {
    this.service = environment.webServiceUri + 'utils';
  }

  public service:string

  public dump = (opt: OptRequest<any>) => {
    console.log("DumpFileService.dump()");
    const url = 'api/v1/utils/dump';
    return this.http.post<any>(url, {})
  }
}
