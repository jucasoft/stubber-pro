import {Filter} from "../path-filter";
import {IncomingMessage} from "http";

export interface StubberProRouteOptions { routePath: string
    pathFilter?: Filter<IncomingMessage>;
}

export interface StubberProoptions {
    basePath: string
    appUri: string
    apiUri: string
    activeDefaultValue: boolean
    routes: StubberProRouteOptions[]
    getKey: (opt: StubberProoptions, req: any)=>string
}
