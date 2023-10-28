import {Filter} from "../path-filter";
import {IncomingMessage} from "http";

export interface StubberProRouteOptions {
  routePath: string
  pathFilter?: Filter<IncomingMessage>;
}

export interface StubberProOptions {
  basePath: string
  appUri: string
  apiUri: string
  activeDefaultValue: boolean // default value of the activer field, if set to true, the captured values will be immediately used as mocks
  routes: StubberProRouteOptions[]
  getKey:(opt: StubberProOptions, req: any)=>string
}
