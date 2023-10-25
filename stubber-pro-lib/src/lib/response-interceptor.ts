import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as zlib from 'zlib';
import {Buffer} from "node:buffer";
import {StubberProRouteOptions} from "./models/stubber-pro-options";
import {matchPathFilter} from "./path-filter";

type Interceptor = (
  buffer: Buffer,
  req: IncomingMessage,
  res: ServerResponse
) => void;

export function responseInterceptor(opt: StubberProRouteOptions, interceptor: Interceptor) {
  return async function proxyResResponseInterceptor(
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> {

    const matched: boolean = matchPathFilter(opt.pathFilter, req.url, req)
    if (matched) {
      next()
      return
    }
    const write = res.write.bind(res);
    const writeHead = res.writeHead.bind(res);
    const end = res.end.bind(res);
    const body: [] = [];

    (res as any).write = (...args: any[]): void => {
      // @ts-ignore
      body.push(args[0])
      // @ts-ignore
      write(...args)
    }

    (res as any).writeHead = (...args: any[]): void => {
      // @ts-ignore
      writeHead(...args)
    }

    (res as any).end = (...args: any[]): void => {
      const result: Buffer = Buffer.concat(body)
      interceptor(result, req, res)
      end(...args)
    }

    next()

  };

}
